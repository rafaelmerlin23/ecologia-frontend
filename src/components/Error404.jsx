import { faFaceSadTear,faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useAuth } from '../AuthProvider'

function Error404() {
   const {logout} = useAuth()
  return (
    <div className='flex h-screen w-screen justify-center items-center flex-col'>

        <div
        className='flex flex-col text-center '>
            
            <FontAwesomeIcon
            className='text-9xl text-gray-300 mb-3' icon={faFaceSadTear}/>
            <h1 className='text-4xl text-gray-300 mb-3'>404</h1>
            <p className='text-2xl text-gray-300 mb-3'>Pagína no encontrada.</p>
            <p className='text-sm pt-0 mt-0 text-blue-400'><FontAwesomeIcon icon={faArrowDown}/>
            </p>
        </div>
        <button onClick={logout} className='mt-4 bg-blue-600 py-1 px-4 rounded-2xl hover:opacity-70'>Login</button>
    </div>
  )
}

export default Error404