import { useState, useEffect } from "react"
import { useAuth } from "../../AuthProvider"
import Grid from "../Grid"
import TarjetaAlbum from "./TarjetaAlbum"
import placeHolderAlbum from '../../assets/place_holder_album.jpg'
import handleGet from "../../helpers/handleGet"
import { useParams } from "react-router-dom"

export const GridAlbum = () => {
  const {setBackRoute, setLocationInformation, userData, shouldRefresh } = useAuth()
  const token = userData.token
  const [page] = useState(1)
  const [quantity] = useState(50)
  const [albumsInformation, setAlbumsInformation] = useState([])
  const { proyectoId,puntoID } = useParams()
  
  useEffect(() => {
    setBackRoute(`/proyectos/${proyectoId}/puntos/`)
    const fetchData = async () => {
      setLocationInformation((LocationInformation)=>({...LocationInformation,index:puntoID}))
      try {

        const endPoint = `pictures/show_albums?page=${page}&quantity=${quantity}&location_id=${puntoID}`;
        // Hacer la petición GET principal
        const response = await handleGet(endPoint, token);

        if (response && response.length > 0) {
          const newAlbumInformation = [];
          // Procesar cada imagen de manera asíncrona
          for (const album of response) {
            let imageAlbum = await fetchImageProject(album[0])
            let urlImage = placeHolderAlbum;
            if (imageAlbum.length > 0) {
              urlImage = imageAlbum[0][0]
            }
            newAlbumInformation.push({
              index: album[0],
              name: album[2],
              date: album[3].slice(4, 17),
              image: urlImage,
            })


          }
          setAlbumsInformation(newAlbumInformation)

          // Actualiza el estado con la nueva información
        }

      } catch (error) {
        console.error('Error en la obtención de datos:', error);
      }
    };

    const fetchImageProject = async (albumId) => {
      const imageEndPoint = `pictures/show_picture_from_album?album_id=${albumId}&page=1&quantity=1`;
      return await handleGet(imageEndPoint, token);


    }

    // Llamar a la función fetchData dentro del useEffect
    fetchData()
    // // Hacer la petición GET
    // fetch(`${prefixUrl}pictures/show_albums?page=${page}&quantity=${quantity}&location_id=${locationInformation.index}`, {
    //   method: 'GET',
    //   headers: {
    //     'Authorization': token // Envía el token en el encabezado Authorization
    //   }
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log('Respuesta del servidor:', data);
    //     if (data && data.status == 'success') {
    //       const newAlbumInformation = data.response.map(
    //         (albumInformation) => ({
    //           index: albumInformation[0],
    //           name: albumInformation[2],
    //           date: albumInformation[3].slice(4, 17),
    //           image: image,
    //         }));
    //       setAlbumsInformation(newAlbumInformation)
    //     }

    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });

  }, [shouldRefresh])


  return (
    <>
      {
        albumsInformation.length > 0 ?
          <Grid>
            {albumsInformation.map((information) => (
              <TarjetaAlbum key={information.index} album={information} />
            ))}
          </Grid>
          :
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