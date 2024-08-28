import React from 'react'
import Overlay from './Overlay'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash,faPen,faCalendar} from "@fortawesome/free-solid-svg-icons"


function Eliminar({esActiva,cerrarOverlay,proyecto}) {
    if(!esActiva.state) return null

    return (
    <Overlay>
        
        <FontAwesomeIcon className='text-2xl' icon={faTrash}/>
        <div>
          <p className='text-2xl font-bold'>¿Deseas eliminar este proyecto?</p>
          <div className='p-4 flex flex-col items-center justify-center mb-0 '>
                <div className='group flex items-center space-x-2 '>
                  <p className='mb-2 text-2xl tracking-tight text-gray-900 text-gray-400 '>{proyecto.nombre}   </p>
                  
                </div>
                <div className='flex items-center  space-x-2 mt-2 mb-4 mb-0'>
                  <FontAwesomeIcon icon={faCalendar}  className="h-5 w-5  mr-2 "/>    
                  <p className=' font-normal text-gray-700 dark:text-gray-400 text-center'>{proyecto.fecha}</p>
                </div>
            </div>
        </div>
        <div>
          <button className='py-2 px-6 text-white bg-red-800 hover:opacity-70 rounded-2xl m-1 border-1 border-red-600'>Eliminar</button>
          <button className='py-2 px-6 text-gray-400 bg-gray-800 hover:opacity-70 rounded-2xl m-1 border-1 border-gray-200' onClick={cerrarOverlay}>cancelar</button>
        </div>
    </Overlay>
  )
}

export default Eliminar
