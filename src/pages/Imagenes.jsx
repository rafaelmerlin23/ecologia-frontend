import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faCamera, faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import SubirImagenes from "../components/imagenes/SubirImagenes";
import { useAuth } from "../AuthProvider";
import { useLocation, useParams } from "react-router-dom";
import ImagesMenu from "../components/imagenes/ImagesMenu";
import ImagesLoader from "../components/Loaders/ImagesLoader";


function Imagenes() {
  const [isActiveUploadImages, setIsActiveUploadImages] = useState(false);
  const {
    shouldRefresh
    , setAlbumInformation
    , images
    , filter
    , quantityImagePerPage
    , loadingComplete
  
  } = useAuth()
  const location = useLocation()
  // const [searchParams, setSearchParams] = useSearchParams()
  const { albumID } = useParams()


  const openImageOverlay = () => {
    setIsActiveUploadImages(true)
  }
  const closeImageOverlay = () => {
    setIsActiveUploadImages(false)
  };

  const areObjectsEqual = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    return true;
  }

  const isDefaultFilter = () => {

    return areObjectsEqual(filter, { quantity: quantityImagePerPage })
  }



  useEffect(() => {
    setAlbumInformation((albumInformation) => ({ ...albumInformation, index: albumID }))


  }, [shouldRefresh]);



  return (
    <>
      <SubirImagenes
        closeOverlay={closeImageOverlay}
        isActive={isActiveUploadImages}
      />
      <div className={`   flex flex-col items-center justify-center ${images.length > 0 || (images.length === 0 && !isDefaultFilter()) ? "mt-32" : "h-screen"}`}>
        
        {(images.length > 0 || (images.length === 0 && !isDefaultFilter()))  ?
          location.pathname != "/imagenes" ? (
            <button
              id="agregar-imagen"
              className={`${
                isActiveUploadImages
                  ? ""
                  : "flex items-center justify-center flex-col h-3/5 w-3/5 pb-4 pt-4 group hover:cursor-pointer"
              } overflow-hidden`}
              onClick={openImageOverlay}
            >
              <FontAwesomeIcon
                className="text-6xl text-gray-400 group-hover:text-gray-300"
                icon={faImage}
              />
              <p className="mb-2 w-full text-center text-2xl mt-2 font-bold text-gray-400 group-hover:text-gray-300">
                Subir imágenes
              </p>
            </button>

            ) : ""

          :""}
          {(loadingComplete && images.length === 0 && isDefaultFilter()) && <div className=" w-screen flex justify-center items-center">
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
          </div>}
      </div >
      <ImagesMenu />
      




    </>
  );
}

export default Imagenes