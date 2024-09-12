import React, { useEffect, useState } from 'react'
import { useAuth } from '../AuthProvider'

function SubirImagenes() {
  const {files} = useAuth()
  const [previews, setPreviews] = useState([])
  
  const handleShowUploadImage = ()=>{
    const imagePreviews = files.map(file=>URL.createObjectURL(file))
    setPreviews(imagePreviews)
  }
  useEffect(()=>{
    handleShowUploadImage()
    
  },[])


  return (
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 w-[400px] w-[400px] place-items-center">
      
      {previews.map((preview,index)=>{

        return(
            <img key={index} className='hover:opacity-75' src={preview} alt={`${preview} no jaló`} />
        )
      })}

    </div>
      
  )
}

export default SubirImagenes
