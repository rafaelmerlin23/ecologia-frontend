import { motion } from 'framer-motion'
import React from 'react'

function LabelWrapper({children,handleClose}) {
  return (
    <motion.div
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.05 }}
            onClick={handleClose}
            className='  fixed z-40 inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center'
            >
            <div
                onClick={(e) => e.stopPropagation()}
                className="  bg-zinc-900 border border-gray-300 p-10  rounded-3xl flex justify-center items-center">
                <button onClick={handleClose} className='text-bold absolute top-2 right-2 text-white text-4xl hover:opacity-70'>
                    x
                </button>
                {children}
                </div>
        </motion.div>
  )
}

export default LabelWrapper