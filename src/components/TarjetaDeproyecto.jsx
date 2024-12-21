import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthProvider'
import { handleDelete } from '../helpers/handleDelete'
import TarjetaEnvoltorio from './TarjetaEnvoltorio'
import BotonesTarjeta from './BotonesTarjeta'

function TarjetaDeproyecto({
  LinkImagen
  , nombre
  , fecha
  , description
  , indice
  , setEsActivaEditar
  , setEsActivaEliminar
}) {

  const { setImagesInformation, imagesInformation, setDeleteInformation, setBackRoute, userData, setProjectInformation, projectInformation, refreshProjects } = useAuth()
  const token = userData.token

  const handleProjectInformation = () => {
    setProjectInformation({ index: indice, name: nombre, description: description, date: fecha })
    console.log(projectInformation)
  }

  useEffect(() => {
    setBackRoute('/')
  }, [])


  const abrirOverlayEliminar = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log(imagesInformation)
    setDeleteInformation({
      peticion: handleDeleteProject,
      iconoInformacionSecundaria: faCalendar,
      objetoEliminar: "Proyecto",
      proyecto: { informacionPrimaria: nombre, informacionSecundaria: fecha }
    })
    setEsActivaEliminar(true)
  }


  const abrirOverlayEditar = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setProjectInformation({ index: indice, name: nombre, description: description, date: fecha })
    setEsActivaEditar(true)
  }

  const handleDeleteProject = async () => {
    const formData = new FormData();
    formData.append('project_id', indice);
    const endPoint = 'projects/delete_project';

    handleDelete(endPoint, formData, token, () => {
      console.log("borrando");
      setEsActivaEliminar(false);

      // Refresca proyectos para obtener la lista actualizada
      refreshProjects(() => {
        if (imagesInformation.length <= 1) {
          console.log("No quedan proyectos");
          setImagesInformation([]);
        }
      })
      // Si solo quedaba un proyecto antes de la eliminación, limpia imagesInformation

    });

  };

  return (
    <>
      <Link onClick={handleProjectInformation} to={`/gestor/proyectos/${indice}/puntos`}>
        <TarjetaEnvoltorio imagen={LinkImagen}>
          <BotonesTarjeta openDelete={abrirOverlayEliminar} openEdit={abrirOverlayEditar} />
          <div className="flex flex-col justify-between p-4 leading-normal md:text-lg overflow-hidden">
            <h5 className="text-center mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate">
              {nombre.length >28 ? `${nombre.slice(0,25)}...`:nombre}
            </h5>
            <div className='justify-center flex items-center space-x-2 mt-2 mb-4'>
              <FontAwesomeIcon className='h-5 w-5 mr-2' icon={faCalendar} />
              <p className="font-normal text-gray-700 dark:text-gray-400 text-center truncate">
                {fecha}
              </p>
            </div>
          </div>
        </TarjetaEnvoltorio>
      </Link>

    </>
  )
}


export default TarjetaDeproyecto