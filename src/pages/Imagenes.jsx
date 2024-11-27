import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faCamera } from '@fortawesome/free-solid-svg-icons';
import SubirImagenes from "../components/imagenes/SubirImagenes";
import { useAuth } from "../AuthProvider";
import { useParams } from "react-router-dom";
import ImagesMenu from "../components/imagenes/ImagesMenu";

function Imagenes() {
  const [isActiveUploadImages, setIsActiveUploadImages] = useState(false);
  const {
    shouldRefresh
    , setAlbumInformation
    , images
  } = useAuth()

  // const [searchParams, setSearchParams] = useSearchParams()
  const { albumID } = useParams()





  const openImageOverlay = () => {
    setIsActiveUploadImages(true)
  }
  const closeImageOverlay = () => {
    setIsActiveUploadImages(false)
  };




  useEffect(() => {
    setAlbumInformation((albumInformation) => ({ ...albumInformation, index: albumID }))


  }, [shouldRefresh]);



  return (
    <>
      <SubirImagenes
        closeOverlay={closeImageOverlay}
        isActive={isActiveUploadImages}
      />
      <div className={`flex flex-col w-full items-center justify-center ${images.length > 0 ? "mt-32" : "h-screen"}`}>
        {images.length > 0 ?
          <button
            id="agregar-imagen"
            className={isActiveUploadImages ? "" : 'flex items-center justify-center flex-col  h-3/5 w-3/5 pb-4 pt-4 group hover:cursor-pointer'}
            onClick={openImageOverlay}>

            <FontAwesomeIcon
              className=" text-6xl text-gray-400 group-hover:text-gray-300"
              icon={faImage}
            />
            <p className=" mb-2 w-screen text-2xl mt-2 font-bold text-gray-400 group-hover:text-gray-300">
              Subir imágenes
            </p>
          </button>
          :
          <div className=" w-screen flex justify-center items-center">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex justify-center items-center h-42 w-42">
                <div className="p-4 border rounded-full h-full w-full flex justify-center items-center">
                  <FontAwesomeIcon className="text-5xl" icon={faCamera} />
                </div>
              </div>
              <p className="text-4xl">Album vacío</p>
              <p className="text-1xl text-gray-200">Cuando subas fotos aparecerán aquí</p>
              <a onClick={openImageOverlay} className="text-blue-500 hover:cursor-pointer hover:text-blue-200">Sube tus fotos aquí</a>
            </div>
          </div>
        }
      </div >
      <ImagesMenu />



    </>
  );
}

export default Imagenes