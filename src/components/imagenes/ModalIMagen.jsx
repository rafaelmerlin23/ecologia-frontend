import React from 'react'
import { handleDateTime } from '../../helpers/formatDate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';

function ModalIMagen({image,isActive,handleClose}) {
    if(!isActive) return null
    return (
    <div onClick={handleClose} className='overflow-y-auto fixed z-50 inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center'>
        <div className='flex justify-center items-center flex-col'>
        <img src={image.link} className='z-40' alt="no src" />
        <div className='w-full bg-gray-700 py-2 flex flex-row justify-center items-center gap-2'>
          < FontAwesomeIcon className='text-2xl' icon={faCalendar}/>
        <p className='font-bold text-3xl text-white'>
          {handleDateTime(image.date)}
        </p>
        </div>
        </div>
    </div>
  )
}

export default ModalIMagen