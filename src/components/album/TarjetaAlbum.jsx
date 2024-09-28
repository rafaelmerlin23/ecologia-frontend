import { useState } from "react"
import { faCalendar, faTrash, faPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth } from "../../AuthProvider"
import Eliminar from "../Eliminar"
import { Link } from "react-router-dom"
import { EditarAlbum } from "./EditarAlbum"
import { handleDelete } from "../../helpers/handleDelete"
import ImagenTarjeta from "../imagenes/ImagenTarjeta"
import TarjetaEnvoltorio from "../TarjetaEnvoltorio"
import BotonesTarjeta from "../BotonesTarjeta"

export const TarjetaAlbum = ({ album }) => {
  const { setAlbumInformation, userData, refreshProjects, setImages } = useAuth()

  const token = userData.token

  const handleAlbumInformation = () => {
    setImages([])
    setAlbumInformation(album)
  }

  const [isDeleteActive, setIsDeleteActive] = useState(false)

  const [isEditActive, setIsEditActive] = useState(false)

  const [claseContenedor, setClaseContenedor] = useState("transition ease-in-out delay-10 hover:-translate-y-1 hover:scale-105  duration-10 hover:saturate-150")



  const cerrarOverlayEliminar = () => {
    setIsDeleteActive(false)
    setClaseContenedor("transition ease-in-out delay-10 hover:-translate-y-1 hover:scale-105  duration-10 hover:saturate-150")
  }

  const abrirOverlayEliminar = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDeleteActive(true)
    setClaseContenedor("")
  }

  const cerrarOverlayEditar = () => {
    handleAlbumInformation()
    setIsEditActive(false)
    setClaseContenedor("transition ease-in-out delay-10 hover:-translate-y-1 hover:scale-105  duration-10 hover:saturate-150")
  }

  const abrirOverlayEditar = (e) => {
    e.preventDefault()
    e.stopPropagation()
    handleAlbumInformation()
    setIsEditActive(true)
    setClaseContenedor("")
  }

  const handleDeleteAlbum = () => {
    const formData = new FormData();
    formData.append('album_id', album.index);
    const endPoint = 'pictures/delete_album'

    handleDelete(endPoint, formData, token, () => {
      refreshProjects()
    })
  }


  return (
    <>
      <EditarAlbum closeEdit={cerrarOverlayEditar} isActive={isEditActive} ></EditarAlbum>
      <Eliminar peticion={handleDeleteAlbum} iconoInformacionSecundaria={faCalendar} objetoEliminar={"Album"} cerrarOverlay={cerrarOverlayEliminar} esActiva={isDeleteActive} proyecto={{ informacionPrimaria: album.name, informacionSecundaria: album.date }} />
      <Link onClick={handleAlbumInformation} to={`${album.name}/navbar-imagenes/imagenes`}  >
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