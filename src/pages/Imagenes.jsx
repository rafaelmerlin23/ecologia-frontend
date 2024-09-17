import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faImages } from '@fortawesome/free-solid-svg-icons';
import SubirImagenes from "../components/imagenes/SubirImagenes";
import { useAuth } from "../AuthProvider";
import prefixUrl from "../helpers/ip";

function Imagenes() {
  const [isActiveUploadImages, setIsActiveUploadImages] = useState(false);
  const { images, setImages, shouldRefresh, userData } = useAuth()
  const token = userData.token

  const openImageOverlay = () => {
    setIsActiveUploadImages(true)
  }
  const closeImageOverlay = () => {
    setIsActiveUploadImages(false)
  };

  useEffect(() => {
    setImages([])
    document.body.className = ' bg-gradient-to-r from-gray-900 to-blue-gray-950 ';
    return () => {
      document.body.className = 'bg-black';
    };
  }, []);

  return (
    <>
      <SubirImagenes
        closeOverlay={closeImageOverlay}
        isActive={isActiveUploadImages}
      />
      {
        images.length > 0 ?
          <div className=" flex flex-col items-center justify-center mt-20">

            <button
              id="agregar-imagen"
              className={isActiveUploadImages ? "" : 'group hover:cursor-pointer'}
              onClick={openImageOverlay}>
              <FontAwesomeIcon
                className="text-4xl text-gray-400 group-hover:text-gray-300"
                icon={faImage}
              />
              <p className="mt-2 font-bold text-gray-400 group-hover:text-gray-300">
                Subir imágenes aquí
              </p>
            </button>
          </div>

          : <div
            className="h-screen w-full flex flex-col items-center justify-center ">
            <button
              onClick={openImageOverlay}
              className={isActiveUploadImages ? "" : 'group hover:cursor-pointer'}
            >
              <p className="text-2xl font-bold mb-6 text-gray-400 group-hover:text-gray-300">No tienes imagenes, click para subir</p>
              <FontAwesomeIcon className="text-9xl text-gray-400 group-hover:text-gray-300" icon={faImages} />
            </button>
          </div>
      }

    </>
  );
}

export default Imagenes