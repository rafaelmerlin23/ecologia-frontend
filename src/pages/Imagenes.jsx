import { useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import SubirImagenes from "./SubirImagenes";
import { useAuth } from "../AuthProvider";

function Imagenes() {
  const [isActiveUploadImages, setIsActiveUploadImages] = useState(false);
  const { setFiles } = useAuth();
 
  const openImageOverlay = () => {
    setIsActiveUploadImages(true)
    setFiles([])
    const addImageBotton = document.getElementById('agregar-imagen')
    addImageBotton.className = '' 
  }
  const closeImageOverlay = () => {
    setIsActiveUploadImages(false)
    const addImageBotton = document.getElementById('agregar-imagen')
    addImageBotton.className = 'group hover:cursor-pointer'
  };

  useEffect(() => {
    document.body.className = 'bg-gradient-to-r from-gray-900 to-blue-gray-950';
    return () => {
      document.body.className = 'bg-black';
    };
  }, []);

  return (
    <div
      
      className="flex flex-col items-center justify-center m-20 "
    >
      <SubirImagenes
        closeOverlay={closeImageOverlay}
        isActive={isActiveUploadImages}
      />
      <button 
      id="agregar-imagen"
      className="group hover:cursor-pointer"
      onClick={openImageOverlay}>
      <FontAwesomeIcon
        className="text-4xl group-hover:text-gray-400"
        icon={faImage}
      />
      <p className="mt-2 font-bold group-hover:text-gray-400">
        Sube tus imágenes aquí
      </p>
      </button>
      
      
    </div>
  );
}

export default Imagenes