import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthProvider';
import ModalImagenes from './ModalImagenes';
import DropZone from './DropZone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash} from "@fortawesome/free-solid-svg-icons";

export function SubirImagenes({ closeOverlay, isActive }) {
  if(!isActive) return null

  const { files,setFiles} = useAuth();

  

  const handleDiscardImage = (file) =>{
    let newImagePreviews = []
    for(let fileFor of files){
        if(fileFor != file){
            newImagePreviews.push(fileFor)
            console.log(fileFor)
        }
    }
    setFiles(newImagePreviews)
  } 


  return (
    <ModalImagenes  closeModal={closeOverlay}>
      <p>Sube tus imágenes aquí</p>
      <DropZone/>
      {files.length > 0 ? (
        <div className="pt-10 grid grid-cols-2 xl:grid-cols-8 lg:grid-cols-4 sm:grid-cols-3  gap-x-0 gap-y-6 p-4 w-full place-items-center ">
          {files.map((file, index) => (
            <div
            className='flex justify-center content-center flex-col ' 
            key={index}>
            <img
              className="object-contain h-48 w-48  m-0  border-dashed border-x-2 border-t-2 border-gray-600"
              src={file.url}
              alt={`Preview ${index}`}
            />
            <button onClick={()=> handleDiscardImage(file)} className='bg-red-800 p-1 hover:opacity-50'>
              <FontAwesomeIcon icon={faTrash}/>
            </button>
            </div>
            
          ))}
        </div>
      ) : (
        <div className='flex justify-center content-center mt-20 mx-10'>
          <p className = 'text-3xl text-gray-600' >---- No hay imágenes seleccionadas ----</p>
        </div>
      )}
    </ModalImagenes>
  );
}

export default SubirImagenes