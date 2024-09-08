import React, { useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendar,faPen} from "@fortawesome/free-solid-svg-icons"
import Eliminar from './Eliminar'
import EditarProyecto from './EditarProyecto'

function TarjetaDeproyecto({LinkImagen,nombre,fecha}) {
  
  const [esActicva,setEsActiva] = useState(false)
  
  const [esActivaEditar,setEsActivaEditar] = useState(false)

  const [claseContenedor,setClaseContenedor] = useState("transition ease-in-out delay-10 hover:-translate-y-1 hover:scale-105  duration-10 hover:saturate-150")

  const cerrarOverlayEliminar = ()=>{
    setEsActiva(false)
    setClaseContenedor("transition ease-in-out delay-10 hover:-translate-y-1 hover:scale-105  duration-10 hover:saturate-150")
    }

  const abrirOverlayEliminar = () =>{
    setEsActiva(true)
    setClaseContenedor("")
  }

  const cerrarOverlayEditar = () =>{
    setEsActivaEditar(false)
    setClaseContenedor("transition ease-in-out delay-10 hover:-translate-y-1 hover:scale-105  duration-10 hover:saturate-150")  
  }

  const abrirOverlayEditar = () =>{
    setEsActivaEditar(true)
    setClaseContenedor("")
  }

  return (
    <>
    <EditarProyecto proyecto = {nombre}  esActivoEditar= {esActivaEditar} cerrarEditar ={cerrarOverlayEditar} />
    <Eliminar iconoInformacionSecundaria={faCalendar} objetoEliminar={"Proyecto"} cerrarOverlay={cerrarOverlayEliminar} esActiva={esActicva} proyecto={{informacionPrimaria:nombre,informacionSecundaria:fecha}  }></Eliminar>
      <div id='tarjeta' className={claseContenedor}>
      <div className='text-center max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2'>
        <button onClick={abrirOverlayEliminar} className='absolute top-0 left-0 bg-gray-700 rounded-full w-6 flex hover:text-white hover:bg-red-950 justify-center content-center'>x</button>
        <img src={LinkImagen} alt="incendio" className="rounded-t-lg hover:cursor-pointer hover-opacity-70"/>
        <div className='p-4'>
          <div onClick={abrirOverlayEditar} className='group flex items-center space-x-2 hover:cursor-pointer'>
            <p className='break-all mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-500 group-hover:underline'>
              {nombre}
            </p>
            <button><FontAwesomeIcon icon={faPen} className="h-5 w-5 ml-2 bg-gray-800 group-hover:text-blue-500 group-hover:bg-gray-700 rounded-full"/></button>
          </div>
          <div className='flex items-center space-x-2 mt-2 mb-4'>
            <FontAwesomeIcon icon={faCalendar} className="h-5 w-5 mr-2"/>
            <p className='font-normal text-gray-700 dark:text-gray-400 text-center'>
              {fecha}
            </p>
          </div>
        </div>
      </div>
    </div>

    </>
  )
}

export default TarjetaDeproyecto