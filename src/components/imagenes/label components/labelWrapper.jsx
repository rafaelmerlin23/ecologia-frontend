import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../AuthProvider'
import handleGetData from '../../../helpers/handleGetData'

function LabelWrapper({children,handleClose}) {
  const {userData,handleCategoryMenu,image} =useAuth()
  const userName = userData.userName
  const token = userData.token
  const [pathName,setPathName] = useState()

  useEffect(()=>{
    const getPath = async()=>{
      const endpoint = `pictures/show_path_picture?picture_id=${image.id}`
      console.log("imagen datos nuevos 2",image.id)
      const path = await handleGetData(endpoint,token)
      console.log("informacion del path: ",path.image)
      setPathName(`${path.image.project_name}/${path.image.location_name}/${path.image.album_name}`)
    }

    image != null && getPath()
  },[])

  return (
    <motion.div
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.02 }}
            onClick={handleClose}
            className=' fixed z-40 inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center'
            >

            <div
                onClick={(e) => e.stopPropagation()}
                className="max-h-[50rem]  overflow-y-auto bg-zinc-900 border border-gray-300 px-10 pb-10 pt-5  rounded-3xl flex justify-center items-center">
                <button onClick={handleClose} className='text-bold absolute top-2 right-2 text-white text-4xl hover:opacity-70'>
                    x
                </button>
                <div className='mb-0'>
                <div className='mb-3 mt-0 flex flex-row'>
                <div className='flex flex-col'>
                <p
                className='text-[1em]'
                >Usuario: <span className="text-sky-300">{userName}</span></p>
                <p
                className='text-[1em]'
                >Dirección: <span className="text-sky-300">{pathName}</span></p>
              
                </div>
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