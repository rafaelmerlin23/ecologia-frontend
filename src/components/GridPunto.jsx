import React, { useEffect, useState } from 'react'
import Grid from './Grid'
import TarjetaPuntos from './TarjetaPuntos'
import { useAuth } from '../AuthProvider'
import placeHolderLocation from '../assets/place_holder_location.jpg'
import handleGet from '../helpers/handleGet'
const imagen = "https://s22908.pcdn.co/wp-content/uploads/2020/02/google-maps-alternatives-1.jpg"




function GridPunto() {
  const [locationsInformation, setLocationsInformation] = useState([])
  const { userData, projectInformation, shouldRefresh } = useAuth()
  const token = userData.token
  useEffect(() => {

    const fetchData = async () => {
      try {

        const endPoint = `pictures/show_locations?page=${1}&project_id=${projectInformation.index}`;
        // Hacer la petición GET principal
        const response = await handleGet(endPoint, token);
        console.log(response)

        if (response && response.length > 0) {
          const newLocationInformation = [];
          // Procesar cada imagen de manera asíncrona
          for (const location of response) {
            let imageLocation = await fetchImageProject(location[0])
            let urlImage = placeHolderLocation;
            if (imageLocation.length > 0) {
              urlImage = imageLocation[0][0]
            }
            newLocationInformation.push({
              locationId: location[0],
              name: location[1],
              coordinates: location[2],
              imageURL: urlImage
            })


          }
          setLocationsInformation(newLocationInformation)

          // Actualiza el estado con la nueva información
        }

      } catch (error) {
        console.error('Error en la obtención de datos:', error);
      }
    };

    const fetchImageProject = async (locationId) => {
      const imageEndPoint = `pictures/show_picture_from_location?location_id=${locationId}&page=1&quantity=1`;
      return await handleGet(imageEndPoint, token);


    }

    // Llamar a la función fetchData dentro del useEffect
    fetchData()


  }, [shouldRefresh])


  return (
    <div>

      {
        locationsInformation.length > 0 ?
          <Grid>
            {locationsInformation.map(location => <TarjetaPuntos index={location.locationId} coordenadas={location.coordinates} imagen={location.imageURL} nombre={location.name} key={location.locationId} />)}
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
