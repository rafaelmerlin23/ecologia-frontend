import React, { useEffect, useState } from 'react'
import Grid from './Grid'
import TarjetaPuntos from './TarjetaPuntos'
import { useAuth } from '../AuthProvider'
const imagen = "https://s22908.pcdn.co/wp-content/uploads/2020/02/google-maps-alternatives-1.jpg"




function GridPunto() {
  const [locationInformation, setLocationInformation] = useState([])
  const { userData, projectInformation, shouldRefresh} = useAuth()
  const token = userData.token
  useEffect(() => {
    // Hacer la petición GET
    fetch(`http://127.0.0.1:5000/api/pictures/show_locations?page=${1}&project_id=${projectInformation.index}`, {
      method: 'GET',
      headers: {
        'Authorization': token // Envía el token en el encabezado Authorization
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Respuesta del servidor:', data);
        if (data && data.status == 'success') {

          const newLocationInformation = data.response.map((location) => ({
            locationId: location[1],
            name: location[1],
            coordinates: location[2],
          }));

          //coordenadas={location.coordinates} imagen={imagen} nombre={location.name} key={location.locationId}
          setLocationInformation(newLocationInformation)
         

        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }, [shouldRefresh])


  return (
    <div>

      {
        locationInformation.length > 0 ?
          <Grid>
            {locationInformation.map(location => <TarjetaPuntos  index={location.locationId} coordenadas={location.coordinates} imagen={imagen} nombre={location.name} key={location.locationId} />)}
          </Grid>
          : <div className='flex justify-center content-center p-5 bg-gradient-to-r from-gray-900 to-blue-gray-950'>
            <div className=''>
              <p className='text-1xl text-gray-500'>-- No tienes Puntos, comienza uno --</p>
            </div>
          </div>
      }
    </div>

  )
}

export default GridPunto
