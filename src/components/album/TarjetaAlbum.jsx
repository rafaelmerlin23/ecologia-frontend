import {  useState } from "react"
import { faCalendar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth } from "../../AuthProvider"
import Eliminar from "../Eliminar"
import { Link} from "react-router-dom"
import { EditarAlbum } from "./EditarAlbum"
import { handleDelete } from "../../helpers/handleDelete"
import TarjetaEnvoltorio from "../TarjetaEnvoltorio"
import BotonesTarjeta from "../BotonesTarjeta"

export const TarjetaAlbum = ({ album,setIsEditActive,setIsDeleteActive }) => {

  const {setAlbumInformation, userData, refreshProjects, setImages,setDeleteInformation } = useAuth()
  
  const token = userData.token

  const handleAlbumInformation = () => {
    setImages([])
    setAlbumInformation(album)
  }

  


  const abrirOverlayEliminar = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDeleteInformation({
      peticion:handleDeleteAlbum,
      iconoInformacionSecundaria:faCalendar,
      objetoEliminar:"Album",
      proyecto:{ informacionPrimaria: album.name, informacionSecundaria: album.date }
    })
    setIsDeleteActive(true)
  }


  const abrirOverlayEditar = (e) => {
    e.preventDefault()
    e.stopPropagation()
    handleAlbumInformation()
    setIsEditActive(true)
  }

  const handleDeleteAlbum = () => {
    const formData = new FormData();
    formData.append('album_id', album.index);
    const endPoint = 'projects/delete_album'

    handleDelete(endPoint, formData, token, () => {
      setIsDeleteActive(false)
      refreshProjects()
    })
  }


  return (
    <>
      <Link onClick={handleAlbumInformation} to={`${album.index}/navbar-imagenes/imagenes`}  >
        <TarjetaEnvoltorio imagen={album.image}>
          <BotonesTarjeta openDelete={abrirOverlayEliminar} openEdit={abrirOverlayEditar} />
          <div className="text-center flex flex-col justify-between p-4 leading-normal md:text-lg">
            <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{album.name}</h5>
            <div className='justify-center flex items-center space-x-2 mt-2 mb-4'>
              <FontAwesomeIcon className='h-5 w-5 mr-2' icon={faCalendar} />
              <p className="font-normal text-gray-700 dark:text-gray-400 text-center">{album.date}</p>
            </div>
          </div>
        </TarjetaEnvoltorio>
      </Link>
    </>

  )
}

export default TarjetaAlbum