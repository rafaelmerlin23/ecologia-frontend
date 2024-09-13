import { useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage,faImages } from '@fortawesome/free-solid-svg-icons';
import SubirImagenes from "../components/imagenes/SubirImagenes";
import { useAuth } from "../AuthProvider";


function Imagenes() {
  const [isActiveUploadImages, setIsActiveUploadImages] = useState(false);
  const {images,setImages} = useAuth()
  
  const openImageOverlay = () => {
    const addImageBotton = document.getElementById('agregar-imagen')
    addImageBotton.className = '' 
    setIsActiveUploadImages(true)
  }
  const closeImageOverlay = () => {
    const addImageBotton = document.getElementById('agregar-imagen')
    addImageBotton.className = 'group hover:cursor-pointer'
    setIsActiveUploadImages(false)
  };

  useEffect(() => {
    document.body.className = 'bg-gradient-to-r from-gray-900 to-blue-gray-950';
    return () => {
      document.body.className = 'bg-black';
    };
  }, []);

  return (
    <>

      {
        images.length > 0 ?
        <div>
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
              Subir imágenes aquí
            </p>
          </button>
        </div>

        :<div className="h-screen w-screen flex flex-col items-center justify-center ">
            <button 
            className="group hover:cursor-pointer"
            >
              <p className="text-2xl font-bold mb-6 text-gray-400 group-hover:text-white">No tienes imagenes, click para subir</p>
              <FontAwesomeIcon className="text-9xl text-gray-400 group-hover:text-white" icon={faImages} />
            </button>
          </div>
      }
      
    </>
  );
}

export default Imagenes