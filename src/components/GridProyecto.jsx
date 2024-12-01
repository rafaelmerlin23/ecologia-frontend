import React from 'react'
import TarjetaDeproyecto from '../components/TarjetaDeproyecto'
import Grid from './Grid'
import { useEffect, useState } from 'react'
import { useAuth } from '../AuthProvider'
import handleGet from '../helpers/handleGet'
import placeHolderImage from '../assets/place_holder_project.png'
import EditarProyecto from './EditarProyecto'
import Eliminar from './Eliminar'
import fetchPicture from '../helpers/HandleFetchPictures'

function GridProyecto() {

  const { imagesInformation, setImagesInformation, userData, shouldRefresh } = useAuth()
  const token = userData.token
  const page = 1
  const quantity = 50
  const [esActivaEditar, setEsActivaEditar] = useState(false)
  const [esActivaEliminar, setEsActivaELiminar] = useState(false)

  const cerrarOverlayEditar = () => {
    setEsActivaEditar(false)
  }

  const cerrarOverlayEliminar = () => {
    setEsActivaELiminar(false)
  }


  useEffect(() => {
    const fetchData = async () => {
      try {

        const endPoint = `projects/show_projects?page=${page}&quantity=${quantity}`;

        // Hacer la petición GET principal
        const response = await handleGet(endPoint, token);

        if (response && response.length > 0) {
          const newImagesInformation = [];
          // Procesar cada imagen de manera asíncrona
          for (const image of response) {

            const query = {
              quantity: 1,
              page: 1,
              projects: image[0],
            }
            const imageProject = await fetchPicture(query, token)

            let urlImage = placeHolderImage;
            if (imageProject.filtered_pictures.length > 0) {
              urlImage = imageProject.filtered_pictures[0].url
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




    // Llamar a la función fetchData dentro del useEffect
    fetchData()
  }, [shouldRefresh]);
  // Dependencia de shouldRefresh
  return (

    <>
      <Eliminar cerrarOverlay={cerrarOverlayEliminar} esActiva={esActivaEliminar} />
      <EditarProyecto isActive={esActivaEditar} cerrarEditar={cerrarOverlayEditar} />
      {
        imagesInformation.length > 0 ? <Grid >
          {imagesInformation.map((x) => (
            <TarjetaDeproyecto
              setEsActivaEditar={setEsActivaEditar}
              key={x.indice}
              indice={x.indice}
              LinkImagen={x.imagen}
              fecha={x.fecha}
              nombre={x.nombre}
              description={x.description}
              setEsActivaEliminar={setEsActivaELiminar} />
          ))}

        </Grid> :
          <div className='flex justify-center content-center p-5'>
            <div className=''>
              <p className='text-1xl text-gray-500'>-- No tienes Proyectos, comienza uno --</p>
            </div>

          </div>
      }
    </>

  )
}

export default GridProyecto