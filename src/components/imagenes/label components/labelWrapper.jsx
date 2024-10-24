import React from 'react'

function LabelWrapper({children,handleClose}) {
  return (
    <div
            onClick={handleClose}
            className='  fixed z-40 inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center'>
            <div
                onClick={(e) => e.stopPropagation()}
                className="  bg-zinc-900 border border-gray-300 p-10  rounded-3xl flex justify-center items-center">
                <button onClick={handleClose} className=' absolute top-2 right-2 text-white text-xl hover:opacity-70'>
                    x
                </button>
                {children}
                </div>
        </div>
  )
}

export default LabelWrapper