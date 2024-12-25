import React, { useEffect } from 'react';
import { useAuth } from '../../AuthProvider';
import ModalImagenes from './ModalImagenes';
import DropZone from './DropZone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useImages } from '../providers/ImagesProvider';

export function SubirImagenes({ closeOverlay, isActive }) {
  const { files, setFiles, isUploading } = useImages()


  useEffect(() => {
    if (isActive) {
      // Oculta el scroll vertical y horizontal
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      // Restaura el scroll
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [isActive]);

  const onDateChange = (index, e) => {
    const newFiles = files.map((file, idx) => {
      if (index == idx) {
        return {
          ...file,
          date: e.target.value
        }
      }
      return {
        ...file
      }

    })
    setFiles(newFiles)
    console.log(newFiles)
  }



  const handleDiscardImage = (file) => {
    let newImagePreviews = []
    for (let fileFor of files) {
      if (fileFor != file) {
        newImagePreviews.push(fileFor)
        console.log(fileFor)
      }
    }
    setFiles(newImagePreviews)
  }

  if (!isActive) return null

  return (
    <ModalImagenes closeModal={closeOverlay}>
      <p className='text-3xl'>Sube tus imágenes aquí</p>
      <DropZone />
      {files.length > 0 ? (
        <div
          className="pt-10 grid grid-cols-2 xl:grid-cols-8 lg:grid-cols-4 sm:grid-cols-3  gap-x-0 gap-y-6 p-4 w-full place-items-center ">
          {files.map((file, index) => (
            <div

              className='flex justify-center content-center flex-col '
              key={index}>
              <input
                disabled={isUploading}
                onChange={(e) => onDateChange(index, e)}
                value={file.date}
                type='date'
                className='disabled:opacity-50 bg-gray-700 text-center' />
              <img
                className="object-contain h-48 w-48  m-0  border-dashed border-x-2 border-t-2 border-gray-600"
                src={file.resizeFile}
                alt={`Preview ${index}`}
              />
              <button
                disabled={isUploading}
                onClick={() => handleDiscardImage(file)}
                className='disabled:opacity-50 bg-red-800 p-1 hover:opacity-50'>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>

          ))}
        </div>
      ) : (
        <div className='flex justify-center content-center mt-20 mx-10'>
          <p className='text-3xl text-gray-600' >---- No hay imágenes seleccionadas ----</p>
        </div>
      )}
    </ModalImagenes>
  );

}

export default SubirImagenes