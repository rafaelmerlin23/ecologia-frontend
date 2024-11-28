import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'

function ButtonsTofilter() {
    

  return (
    <div className='col-span-4   flex sm:justify-center justify-center md:justify-end xl:justify-end lg:justify-end gap-6 mt-4'>
        <button
            className='h-10 flex justify-center items-center text-1xl bg-amber-950  text-red-500 font-medium px-2 rounded-md hover:opacity-70 focus:opacity-50'>
            Resetear
        </button>

        <button type='submit' className='h-10 gap-2 flex justify-center items-center text-1xl bg-blue-600 px-2 rounded-md hover:opacity-70 focus:opacity-50'>
            <FontAwesomeIcon className='text-sm' icon={faFilter} /> Filtrar
        </button>
    </div>
  )
}

export default ButtonsTofilter