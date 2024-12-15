import { useState, useEffect } from "react"
import { useAuth } from "../../AuthProvider"
import Grid from "../Grid"
import TarjetaAlbum from "./TarjetaAlbum"
import placeHolderAlbum from '../../assets/place_holder_album.jpg'
import handleGet from "../../helpers/handleGet"
import { useParams } from "react-router-dom"
import { EditarAlbum } from "./EditarAlbum"
import Eliminar from "../Eliminar"
import fetchPicture from '../../helpers/HandleFetchPictures'
import EstructuraLoader from "../Loaders/EstructuraLoader"

export const GridAlbum = () => {
  const { 
    isLoadingStructure
    , setIsLoadingStructure
    , setLocationInformation, userData, shouldRefresh } = useAuth()
  const token = userData.token
  const [page] = useState(1)
  const [quantity] = useState(50)
  const [albumsInformation, setAlbumsInformation] = useState([])
  const {  puntoID } = useParams()

  const [isEditActive, setIsEditActive] = useState(false)
  const [isDeleteActive, setIsDeleteActive] = useState(false)


  const closeEditOverlay = () => {
    setIsEditActive(false)
  }

  const closeDeleteOverlay = () => {
    setIsDeleteActive(false)
  }

  useEffect(() => {
    setIsLoadingStructure((prev) => ({ ...prev, album: false }))
    const fetchData = async () => {
      setLocationInformation((LocationInformation) => ({ ...LocationInformation, index: puntoID }))
      try {

        const endPoint = `projects/show_albums?page=${page}&quantity=${quantity}&location_id=${puntoID}`;
        // Hacer la petición GET principal
        const response = await handleGet(endPoint, token);

        if (response) {
          setTimeout(() => {
            setIsLoadingStructure((prev) => ({ ...prev, album: true }))
          }, 600);
        }
        if (response && response.length > 0) {
          const newAlbumInformation = [];
          // Procesar cada imagen de manera asíncrona
          for (const album of response) {

            const query = {
              quantity: 1,
              page: 1,
              albums: album[0],
            }

            let imageAlbum = await fetchPicture(query)
            let urlImage = placeHolderAlbum;
            if (imageAlbum.filtered_pictures.length > 0) {
              urlImage = imageAlbum.filtered_pictures[0].url
            }
            newAlbumInformation.push({
              index: album[0],
              name: album[2],
              date: album[3].slice(4, 17),
              image: urlImage,
            })


          }
          setAlbumsInformation(newAlbumInformation)
          setTimeout(() => {
            setIsLoadingStructure((prev) => ({ ...prev, album: true }))
          }, 600);
          // Actualiza el estado con la nueva información
        }

      } catch (error) {
        console.error('Error en la obtención de datos:', error);
      }
    };
    fetchData()

  }, [shouldRefresh])


  return (
    <>
      <EditarAlbum closeEdit={closeEditOverlay} isActive={isEditActive} ></EditarAlbum>
      <Eliminar
        cerrarOverlay={closeDeleteOverlay}
        esActiva={isDeleteActive}
      />
      {!isLoadingStructure.album && <EstructuraLoader />}
      {(albumsInformation.length > 0 && isLoadingStructure.album) && <Grid>
        {albumsInformation.map((information) => (
          <TarjetaAlbum
            key={information.index}
            album={information}
            setIsEditActive={setIsEditActive}
            setIsDeleteActive={setIsDeleteActive}
          />
        ))}
      </Grid>}

      {
        (isLoadingStructure.album && albumsInformation.length === 0) &&
        <div className='flex justify-center content-center p-5 bg-gradient-to-r from-gray-900 to-blue-gray-950'>
          <div className=''>
            <p className='text-1xl text-gray-500'>-- No tienes Albumes, crea uno --</p>
          </div>
        </div>
      }
    </>
  )
}

export default GridAlbum