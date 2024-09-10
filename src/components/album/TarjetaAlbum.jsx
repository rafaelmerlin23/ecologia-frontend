import { useState } from "react"
import { faCalendar,faTrash,faPen } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../../AuthProvider"
import Eliminar from "../Eliminar"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const TarjetaAlbum = ({album}) => {
  const { setAlbumInformation} = useAuth()

  const handleAlbumInformation = () => {
    setAlbumInformation(album)
    console.log(projectInformation)
  }

    const [isDeleteActive, setIsDeleteActive] = useState(false)

    const [isEditActive, setIsEditActive] = useState(false)

    const [claseContenedor, setClaseContenedor] = useState("transition ease-in-out delay-10 hover:-translate-y-1 hover:scale-105  duration-10 hover:saturate-150")



  const cerrarOverlayEliminar = () => {
    setIsDeleteActive(false)
    setClaseContenedor("transition ease-in-out delay-10 hover:-translate-y-1 hover:scale-105  duration-10 hover:saturate-150")
  }

  const abrirOverlayEliminar = () => {
    setIsDeleteActive(true)
    setClaseContenedor("")
  }

  const cerrarOverlayEditar = () => {
    handleAlbumInformation()
    setIsEditActive(false)
    setClaseContenedor("transition ease-in-out delay-10 hover:-translate-y-1 hover:scale-105  duration-10 hover:saturate-150")
  }
  
  const abrirOverlayEditar = () => {
    setAlbumInformation(album)
    setIsEditActive(true)
    setClaseContenedor("")
  }

  return(
    <>
    <Eliminar iconoInformacionSecundaria={faCalendar} objetoEliminar={"Album"} cerrarOverlay={cerrarOverlayEliminar} esActiva={isDeleteActive} proyecto={{ informacionPrimaria: album.name, informacionSecundaria: album.date }}/>
     <div className="pt-5 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-col lg:flex-col xl:flex-col w-full md:max-w-2xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <Link onClick = {handleAlbumInformation} >
      <img className="object-cover w-full rounded-t-lg h-64 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg lg:w-200" src={album.image} alt="" />
    </Link>
      <div className='flex items-center justify-center space-x-2 pt-6'>
        <button onClick={abrirOverlayEditar}><FontAwesomeIcon className='text-2xl bg-gray-950 p-2 pl-6 pr-6 rounded-2xl' icon={faPen} /></button>
        <button oncl onClick={abrirOverlayEliminar}><FontAwesomeIcon className='text-2xl bg-red-800 p-2 pr-6  pl-6 rounded-2xl' icon={faTrash} /> </button>
      </div>
    <div className="flex flex-col justify-between p-4 leading-normal md:text-lg">
      <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{album.name}</h5>
      <div className='flex items-center space-x-2 mt-2 mb-4'>
        <FontAwesomeIcon className='h-5 w-5 mr-2' icon={faCalendar} />
        <p className="font-normal text-gray-700 dark:text-gray-400 text-center">{album.date}</p>
      </div>
    </div>
  </div>

    </>
  )
}

export default TarjetaAlbum