import React from 'react'

function ModalIMagen({image,isActive,handleClose}) {
    if(!isActive) return null
    return (
    <div onClick={handleClose} className=' fixed z-50 inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center'>
        <img src={image.link} className='z-40' alt="no src" />
    </div>
  )
}

export default ModalIMagen