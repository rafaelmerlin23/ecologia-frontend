import React, { useEffect, useState } from 'react'
import Grid from './Grid'
import TarjetaPuntos from './TarjetaPuntos'
import { useAuth } from '../AuthProvider'
import prefixUrl from '../helpers/ip'
const imagen = "https://s22908.pcdn.co/wp-content/uploads/2020/02/google-maps-alternatives-1.jpg"




function GridPunto() {
  const [locationsInformation, setLocationsInformation] = useState([])
  const { userData, projectInformation, shouldRefresh} = useAuth()
  const token = userData.token
  useEffect(() => {
    // Hacer la petición GET
    fetch(`${prefixUrl}pictures/show_locations?page=${1}&project_id=${projectInformation.index}`, {
      method: 'GET',
      headers: {
        'Authorization': token // Envía el token en el encabezado Authorization
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Respuesta del servidor:', data);
        if (data && data.status == 'success') {

          const newLocationsInformation = data.response.map((location) => ({
            locationId: location[0],
            name: location[1],
            coordinates: location[2],
          }));

          //coordenadas={location.coordinates} imagen={imagen} nombre={location.name} key={location.locationId}
          setLocationsInformation(newLocationsInformation)
         

        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }, [shouldRefresh])


  return (
    <div>

      {
        locationsInformation.length > 0 ?
          <Grid>
            {locationsInformation.map(location => <TarjetaPuntos  index={location.locationId} coordenadas={location.coordinates}  imagen={imagen} nombre={location.name} key={location.locationId} />)}
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
