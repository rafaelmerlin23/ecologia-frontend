import { useState, useEffect } from "react"
import { useAuth } from "../../AuthProvider"
import Grid from "../Grid"
import prefixUrl from "../../helpers/ip"
import TarjetaAlbum from "./TarjetaAlbum"
export const GridAlbum = () => {
  const { locationInformation, userData, shouldRefresh } = useAuth()
  const token = userData.token
  const [page, setPage] = useState(1)
  const [quantity, setquantity] = useState(50)
  const [albumsInformation, setAlbumsInformation] = useState([])
  const image = 'https://www.billboard.com/wp-content/uploads/media/tyler-the-creator-igor-album-art-2019-billboard-embed.jpg?w=600'

  useEffect(() => {
    // Hacer la petición GET
    fetch(`${prefixUrl}pictures/show_albums?page=${page}&quantity=${quantity}&location_id=${locationInformation.index}`, {
      method: 'GET',
      headers: {
        'Authorization': token // Envía el token en el encabezado Authorization
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Respuesta del servidor:', data);
        if (data && data.status == 'success') {
          const newAlbumInformation = data.response.map(
            (albumInformation) => ({
              index: albumInformation[0],
              name: albumInformation[2],
              date: albumInformation[3].slice(4, 17),
              image: image,
            }));
          setAlbumsInformation(newAlbumInformation)
        }

      })
      .catch((error) => {
        console.error('Error:', error);
      });

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