import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import Eliminar from './Eliminar'
import { useAuth } from '../AuthProvider'
import { Link } from 'react-router-dom'
import EditarPunto from './location/EditarPunto'
import { handleDelete } from '../helpers/handleDelete'
import TarjetaEnvoltorio from './TarjetaEnvoltorio'
import BotonesTarjeta from './BotonesTarjeta'

function TarjetaPuntos({ index, nombre, coordenadas, imagen }) {



  const [esActivoOverlay, setEsActivoOverlay] = useState(false)

  const [isEditActive, setIsEditActive] = useState(false)


  const { setLocationInformation, locationInformation, userData, refreshProjects } = useAuth()

  const token = userData.token

  const handleLocationInformation = () => {
    setLocationInformation({ index: index, name: nombre, coordinates: coordenadas, image: imagen })
    console.log(locationInformation)
  }

  const openEditOverlay = (e) => {
    e.preventDefault()
    e.stopPropagation()
    handleLocationInformation()
    setIsEditActive(true)
  }

  const closeEditOverlay = () => {
    setIsEditActive(false)
  }

  const cerrarOverlayEliminar = () => {
    setEsActivoOverlay(false)
  }

  const abrirOverlayEliminar = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setEsActivoOverlay(true)
  }

  const handleDeleteLocation = () => {
    const formData = new FormData();
    formData.append('location_id', index);
    const endPoint = 'pictures/delete_location'

    handleDelete(endPoint, formData, token, () => {
      refreshProjects()
    })
  }

  return (
    <>
      <EditarPunto isActive={isEditActive} closeEdit={closeEditOverlay} ></EditarPunto>
      <Eliminar peticion={handleDeleteLocation}
        iconoInformacionSecundaria={faLocationDot}
        objetoEliminar={"Punto"}
        cerrarOverlay={cerrarOverlayEliminar}
        esActiva={esActivoOverlay}
        proyecto={{ informacionPrimaria: nombre, informacionSecundaria: coordenadas }}></Eliminar>
      <Link onClick={handleLocationInformation} to={`${nombre}/albumes`}>
        <TarjetaEnvoltorio imagen={imagen}>
          <BotonesTarjeta openDelete={abrirOverlayEliminar} openEdit={openEditOverlay} />
          <div className="flex flex-col justify-between p-4 leading-normal md:text-lg">
            <h5 className="text-center mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{nombre}</h5>
            <div className='justify-center flex items-center space-x-2 mt-2 mb-4'>
              <FontAwesomeIcon className='h-5 w-5 mr-2' icon={faLocationDot} />
              <p className="font-normal text-gray-700 dark:text-gray-400 text-center">{coordenadas}</p>
            </div>
          </div>
        </TarjetaEnvoltorio>
      </Link>
    </>

  )
}

export default TarjetaPuntos
