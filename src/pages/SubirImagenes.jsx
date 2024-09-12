import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider';
import ModalImagenes from '../components/imagenes/ModalImagenes';
import DropZone from '../components/imagenes/DropZone';

export function SubirImagenes({ closeOverlay, isActive }) {
  if(!isActive) return null

  const { files,setFiles } = useAuth();
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    if (files.length > 0) {
      const imagePreviews = files.map((file) => URL.createObjectURL(file));
      setPreviews(imagePreviews);
    }
  }, [files]);


  return (
    <ModalImagenes  closeModal={closeOverlay}>
      <p>Sube tus imágenes aquí</p>
      <DropZone/>
      {previews.length > 0 ? (
        <div className="pt-10 grid grid-cols-2 xl:grid-cols-8 lg:grid-cols-4 sm:grid-cols-3  gap-x-0 gap-y-6 p-4 w-full place-items-center ">
          {previews.map((preview, index) => (
            <img
              key={index}
              className="object-contain h-48 w-48 border-dashed border-2 border-gray-600 m-0"
              src={preview}
              alt={`Preview ${index}`}
            />
          ))}
        </div>
      ) : (
        <div>No hay imágenes seleccionadas</div>
      )}
    </ModalImagenes>
  );
}

export default SubirImagenes