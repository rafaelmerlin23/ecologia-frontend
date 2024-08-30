import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"

function TarjetaPuntos({ nombre, coordenadas, imagen }) {
  return (
      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row w-full md:max-w-2xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img className="object-cover w-full rounded-t-lg h-64 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={imagen} alt="" />
        <div className="flex flex-col justify-between p-4 leading-normal md:text-lg">
          <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{nombre}</h5>
          <div className='flex items-center space-x-2 mt-2 mb-4'>
            <FontAwesomeIcon className='h-5 w-5 mr-2' icon={faLocationDot} />
            <p className="font-normal text-gray-700 dark:text-gray-400 text-center">{coordenadas}</p>
          </div>
        </div>
      </div>
  )
}

export default TarjetaPuntos
