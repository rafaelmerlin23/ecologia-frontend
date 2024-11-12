import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useAuth } from '../../../AuthProvider'

function LabelWrapper({children,handleClose}) {
  const {userData,handleCategoryMenu} =useAuth()
  const userName = userData.userName
  

  return (
    <motion.div
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.02 }}
            onClick={handleClose}
            className=' fixed z-30 inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center'
            >

            <div
                onClick={(e) => e.stopPropagation()}
                className="max-h-[50rem]  overflow-y-auto bg-zinc-900 border border-gray-300 px-10 pb-10 pt-5  rounded-3xl flex justify-center items-center">
                <button onClick={handleClose} className='text-bold absolute top-2 right-2 text-white text-4xl hover:opacity-70'>
                    x
                </button>
                <div className='mb-0'>
                <div className='mb-3 mt-0 flex flex-row'>
                <p
                className='text-[1em]'
                >Usuario: <span className="text-sky-300">{userName}</span></p>
               
                </div>
                <div>
                {children}
                
                </div>
                </div>
                
                </div>
        </motion.div>
  )
}

export default LabelWrapper