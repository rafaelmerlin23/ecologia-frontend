import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faImages, faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons';
import SubirImagenes from "../components/imagenes/SubirImagenes";
import { useAuth } from "../AuthProvider";
import prefixUrl from "../helpers/ip";
import GridImagenes from "../components/imagenes/GridImagenes";
import { useParams, useSearchParams } from "react-router-dom";
import { Paginacion } from "../components/imagenes/Paginacion";
import handleGetData from "../helpers/handleGetData";
import InfiniteScrolling from "../components/imagenes/InfiniteScrolling";

function Imagenes() {
  const [isActiveUploadImages, setIsActiveUploadImages] = useState(false);
  const {
    setImage
    , cardImagePage
    , setIsTaggerActive
    , setPageImage
    , pageImage
    , setMaxPage
    , setCardImagePage
    , shouldRefresh
    , userData
    , setAlbumInformation } = useAuth()

  const token = userData.token
  // const [searchParams, setSearchParams] = useSearchParams()
  const { albumID } = useParams()




  // const handleNext = () => {
  //   const newPage = Number(pageImage) + 1;
  //   setSearchParams(params => {
  //     params.set("page", newPage);
  //     return params;
  //   });
  //   setPageImage(newPage); // Usa el nuevo número de página aquí
  // }

  // const handlePrevious = () => {
  //   const newPage = Number(pageImage) - 1;
  //   setSearchParams(params => {
  //     params.set("page", newPage);
  //     return params;
  //   });
  //   setPageImage(newPage); // Usa el nuevo número de página aquí
  // }

  const openImageOverlay = () => {
    setIsActiveUploadImages(true)
  }
  const closeImageOverlay = () => {
    setIsActiveUploadImages(false)
  };

  // const handleTagger = () => {
  //   console.log(cardImagePage)
  //   const endPoint = `pictures/show_picture_from_album?page=${searchParams.get('image-page')}&quantity=${1}&album_id=${albumID}`

  //   handleGetData(endPoint, token).then((data) => {
  //     if (data && data.status == 'success') {
  //       const newImages = data.response.map((response) => (
  //         {
  //           link: response[0],
  //           id: response[1],
  //           date: response[2],
  //         }
  //       ))
  //       setImage(newImages[0])
  //       setCardImagePage(searchParams.get('image-page'))
  //       setIsTaggerActive(true)
  //       setMaxPage(data.total_pages)
  //     }
  //   }).catch((error) => {
  //     console.error('Error:', error);
  //   });
  // }



  // link: response[0],
  // id: response[1],
  // date: response[2],

  useEffect(() => {
    setAlbumInformation((albumInformation) => ({ ...albumInformation, index: albumID }))


  }, [shouldRefresh]);



  return (
    <>
      <SubirImagenes
        closeOverlay={closeImageOverlay}
        isActive={isActiveUploadImages}
      />
      <div className=" flex flex-col items-center justify-center mt-32">
        <button
          id="agregar-imagen"
          className={isActiveUploadImages ? "" : ' h-3/5 w-3/5 pb-4 pt-4 group hover:cursor-pointer'}
          onClick={openImageOverlay}>

          <FontAwesomeIcon
            className="text-6xl text-gray-400 group-hover:text-gray-300"
            icon={faImage}
          />
          <p className="mb-2 text-2xl mt-2 font-bold text-gray-400 group-hover:text-gray-300">
            Subir imágenes
          </p>
        </button>
        <InfiniteScrolling />
      </div >



    </>
  );
}

export default Imagenes