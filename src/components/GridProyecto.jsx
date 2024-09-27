import React from 'react'
import TarjetaDeproyecto from '../components/TarjetaDeproyecto'
import Grid from './Grid'
import { useEffect, useState } from 'react'
import { useAuth } from '../AuthProvider'
import handleGet from '../helpers/handleGet'
import placeHolderImage from '../assets/place_holder_project.png'

function GridProyecto() {

  const { userData, shouldRefresh } = useAuth()
  const token = userData.token
  const [imagesInformation, setImagesInformation] = useState([])
  const page = 1
  const quantity = 50
useEffect(() => {
  const fetchData = async () => {
    try {

      const endPoint = `pictures/show_projects?page=${page}&quantity=${quantity}`;
      
      // Hacer la petición GET principal
      const response = await handleGet(endPoint, token);

      if (response && response.length > 0) {
        const newImagesInformation = [];

        // Procesar cada imagen de manera asíncrona
        for (const image of response) {
          let imageProject =await fetchImageProject(image[0])
          let urlImage = placeHolderImage;
          if(imageProject.length > 0){
            urlImage = imageProject[0][0]
          }
          newImagesInformation.push({
            indice: image[0],
            imagen: urlImage,
            fecha: image[3].slice(4, 17), // Verifica si la fecha está en el formato adecuado
            nombre: image[1],
            description: image[2]
          });
        }

        // Actualiza el estado con la nueva información
        setImagesInformation(newImagesInformation);
      }

    } catch (error) {
      console.error('Error en la obtención de datos:', error);
    }
  };

  const fetchImageProject = async (projectId)=>{
    const imageEndPoint = `pictures/show_picture_from_project?project_id=${projectId}&page=1&quantity=1`;
      return await handleGet(imageEndPoint, token);
      
    
  } 

  // Llamar a la función fetchData dentro del useEffect
  fetchData()
}, [shouldRefresh, page, quantity, token]);
 // Dependencia de shouldRefresh
  return (

    <>
      {
        imagesInformation.length > 0 ? <Grid >
          {imagesInformation.map((x) => (
            <TarjetaDeproyecto key={x.indice} indice={x.indice} LinkImagen={x.imagen} fecha={x.fecha} nombre={x.nombre} description={x.description} />
          ))}
        </Grid> :
          <div className='flex justify-center content-center p-5 bg-gradient-to-r from-gray-900 to-blue-gray-950'>
            <div className=''>
              <p className='text-1xl text-gray-500'>-- No tienes Proyectos, comienza uno --</p>
            </div>

          </div>
      }
    </>

  )
}

export default GridProyecto