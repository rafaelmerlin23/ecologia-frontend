import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom' // Importar useSearchParams
import Grid from './Grid'
import TarjetaPuntos from './TarjetaPuntos'
import { useAuth } from '../AuthProvider'
import placeHolderLocation from '../assets/place_holder_location.jpg'
import handleGet from '../helpers/handleGet'
import EditarPunto from './location/EditarPunto'
import Eliminar from './Eliminar'
import fetchPicture from '../helpers/HandleFetchPictures'
import EstructuraLoader from './Loaders/EstructuraLoader'

function GridPunto() {
  const [locationsInformation, setLocationsInformation] = useState([])
  const { isLoadingStructure
    , setIsLoadingStructure, setBackRoute, userData, shouldRefresh, projectInformation, setProjectInformation } = useAuth()
  const token = userData.token
  const [isEditActive, setIsEditActive] = useState(false)
  const [isDeleteActive, setIsDeleteActive] = useState(false)

  // Usar useSearchParams para obtener los parámetros de la URL
  const { proyectoId } = useParams();  // Accede al proyectoId desde la URL

  const closeEditOverlay = () => {
    setIsEditActive(false)
  }

  const closeDeleteOverlay = () => {
    setIsDeleteActive(false)
  }

  useEffect(() => {
    setIsLoadingStructure((prev) => ({ ...prev, location: false }))

    const fetchData = async () => {
      setProjectInformation((projectInformation) => ({ ...projectInformation, index: proyectoId }))
      try {
        // Usa solo 'project_id' en el endpoint
        let endPoint = `projects/show_locations?project_id=${proyectoId}`;

        const response = await handleGet(endPoint, token);
        if (response) {
          setTimeout(() => {
            setIsLoadingStructure((prev) => ({ ...prev, location: true }))
          }, 600);
        }

        if (response && response.length > 0) {
          const newLocationInformation = [];
          for (const location of response) {

            const query = {
              quantity: 1,
              page: 1,
              locations: location[0],
            }
            let imageLocation = await fetchPicture(query);
            let urlImage = placeHolderLocation;
            if (imageLocation.filtered_pictures.length > 0) {
              urlImage = imageLocation.filtered_pictures[0].url
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
  }, [shouldRefresh,]);

  return (
    <div>
      <Eliminar cerrarOverlay={closeDeleteOverlay} esActiva={isDeleteActive} />
      <EditarPunto isActive={isEditActive} closeEdit={closeEditOverlay} ></EditarPunto>
      {!isLoadingStructure.location && <EstructuraLoader />}
      {locationsInformation.length > 0 && isLoadingStructure.location ?
        <Grid>
          {locationsInformation.map(location => (
            <TarjetaPuntos
              index={location.locationId}
              coordenadas={location.coordinates}
              imagen={location.imageURL}
              nombre={location.name}
              key={location.locationId}
              setIsEditActive={setIsEditActive}
              setIsDeleteActive={setIsDeleteActive}
            />
          ))}
        </Grid>
        : ""}
      {isLoadingStructure.location && locationsInformation.length === 0 ?
        <div className='flex justify-center content-center p-5 bg-gradient-to-r from-gray-900 to-blue-gray-950'>
          <div className=''>
            <p className='text-1xl text-gray-500'>-- No tienes Puntos, comienza uno --</p>
          </div>
        </div>
        : ""}
    </div>
  );
}

export default GridPunto;
