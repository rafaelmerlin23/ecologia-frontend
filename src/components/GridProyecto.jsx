import React from 'react'
import TarjetaDeproyecto from '../components/TarjetaDeproyecto'
import Grid from './Grid'
import { useEffect, useState } from 'react'
import { useAuth } from '../AuthProvider'
function GridProyecto() {

  const { userData, shouldRefresh } = useAuth()
  const token = userData.token
  const [imagesInformation, setImagesInformation] = useState([])
  const imagen = "https://s3.abcstatics.com/abc/www/multimedia/espana/2024/08/27/incendio_20240827162958-R3i0wNdkbC83YsBPKdtBArN-1200x840@diario_abc.jpg"
  const page = 1
  const quantity = 50

  useEffect(() => {
    // Hacer la petición POST
    fetch(`http://127.0.0.1:5000/api/pictures/show_projects?page=${page}&quantity=${quantity}`, {
      method: 'GET',
      headers: {
        'Authorization': token // Envía el token en el encabezado Authorization
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Respuesta del servidor:', data);
        if (data && data.status == 'success') {
          const newImagesInformation = data.response.map((image) => ({
            indice: image[0],
            imagen: imagen,
            fecha: image[3].slice(4, 17),
            nombre: image[1]
          }));
          setImagesInformation(newImagesInformation);
          console.log(newImagesInformation);

        }

      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }, [shouldRefresh])

  return (

    <>
      {
        imagesInformation.length > 0 ? <Grid >
          {imagesInformation.map((x) => (
            <TarjetaDeproyecto key={x.indice} LinkImagen={x.imagen} fecha={x.fecha} nombre={x.nombre} />
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