import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom' // Importar useSearchParams
import Grid from './Grid'
import TarjetaPuntos from './TarjetaPuntos'
import { useAuth } from '../AuthProvider'
import placeHolderLocation from '../assets/place_holder_location.jpg'
import handleGet from '../helpers/handleGet'

function GridPunto() {
  const [locationsInformation, setLocationsInformation] = useState([])
  const { setBackRoute,userData, shouldRefresh,projectInformation,setProjectInformation } = useAuth()
  const token = userData.token

  // Usar useSearchParams para obtener los parámetros de la URL
  const { proyectoId } = useParams();  // Accede al proyectoId desde la URL

  useEffect(() => {
    setBackRoute('/proyectos')
    
    const fetchData = async () => {
      setProjectInformation((projectInformation)=>({...projectInformation,index:proyectoId}))
      try {
        // Usa solo 'project_id' en el endpoint
        let endPoint = `projects/show_locations?project_id=${proyectoId}`;

        const response = await handleGet(endPoint, token);

        if (response && response.length > 0) {
          const newLocationInformation = [];
          for (const location of response) {
            let imageLocation = await fetchImageProject(location[0]);
            let urlImage = placeHolderLocation;
            if (imageLocation.length > 0) {
              urlImage = imageLocation[0][0];
            }
            newLocationInformation.push({
              locationId: location[0],
              name: location[1],
              coordinates: location[2],
              imageURL: urlImage
            });
          }
          setLocationsInformation(newLocationInformation);
        }
      } catch (error) {
        console.error('Error en la obtención de datos:', error);
      }
    };

    const fetchImageProject = async (locationId) => {
      const imageEndPoint = `pictures/show_picture_from_location?location_id=${locationId}&quantity=1`;
      return await handleGet(imageEndPoint, token);
    };

    fetchData();
  }, [shouldRefresh, token]);

  return (
    <div>
      {locationsInformation.length > 0 ? (
        <Grid>
          {locationsInformation.map(location => (
            <TarjetaPuntos
              index={location.locationId}
              coordenadas={location.coordinates}
              imagen={location.imageURL}
              nombre={location.name}
              key={location.locationId}
            />
          ))}
        </Grid>
      ) : (
        <div className='flex justify-center content-center p-5 bg-gradient-to-r from-gray-900 to-blue-gray-950'>
          <div className=''>
            <p className='text-1xl text-gray-500'>-- No tienes Puntos, comienza uno --</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default GridPunto;
