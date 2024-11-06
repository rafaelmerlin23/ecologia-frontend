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

function Imagenes() {
  const [isActiveUploadImages, setIsActiveUploadImages] = useState(false);
  const {
    setImage
    , cardImagePage
    , setIsTaggerActive
    , quantityImagePerPage
    , setPageImage
    , pageImage
    , setMaxPage
    , images
    , setCardImagePage
    , setImages
    , shouldRefresh
    , userData
    , setAlbumInformation } = useAuth()
  const [isLoadingImage, setIsLoadingImage] = useState(false)
  const token = userData.token
  const [searchParams, setSearchParams] = useSearchParams()
  const { albumID } = useParams()
  const { currentPageDate, setCurrentPageDate } = useState()

  const MONTHS = {
    1: "Enero",
    2: "Febrero",
    3: "Marzo",
    4: "Abril",
    5: "Mayo",
    6: "Junio",
    7: "Julio",
    8: "Agosto",
    9: "Septiembre",
    10: "Octubre",
    11: "Noviembre",
    12: "Diciembre",
  }


  const handleNext = () => {
    const newPage = Number(pageImage) + 1;
    setSearchParams(params => {
      params.set("page", newPage);
      return params;
    });
    setPageImage(newPage); // Usa el nuevo número de página aquí
  }

  const handlePrevious = () => {
    const newPage = Number(pageImage) - 1;
    setSearchParams(params => {
      params.set("page", newPage);
      return params;
    });
    setPageImage(newPage); // Usa el nuevo número de página aquí
  }

  const openImageOverlay = () => {
    setIsActiveUploadImages(true)
  }
  const closeImageOverlay = () => {
    setIsActiveUploadImages(false)
  };

  const handleTagger = () => {
    console.log(cardImagePage)
    const endPoint = `pictures/show_picture_from_album?page=${searchParams.get('image-page')}&quantity=${1}&album_id=${albumID}`

    handleGetData(endPoint, token).then((data) => {
      if (data && data.status == 'success') {
        const newImages = data.response.map((response) => (
          {
            link: response[0],
            id: response[1],
            date: response[2],
          }
        ))
        setImage(newImages[0])
        setCardImagePage(searchParams.get('image-page'))
        setIsTaggerActive(true)
        setMaxPage(data.total_pages)
      }
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  const getInformation = async () => {
    // conseguir el rango maximo de fechas 
    //conseguir imagenes
    const endpointImages = `pictures/show_picture_from_album_pages`

    const hola = await handleGetData(endpointImages, token)
    console.log(hola)
  }

  // link: response[0],
  // id: response[1],
  // date: response[2],

  useEffect(() => {
    setAlbumInformation((albumInformation) => ({ ...albumInformation, index: albumID }))
    getInformation()
    setIsLoadingImage(true)

  }, [shouldRefresh]);



  return (
    <>
      <SubirImagenes
        closeOverlay={closeImageOverlay}
        isActive={isActiveUploadImages}
      />
      {!isLoadingImage ?
        <div className="mt-48 flex justify-center items-center ">
          <p className="text-3xl">Cargando...</p>
        </div>
        : (images.length > 0 ?
          <div className=" flex flex-col items-center justify-center mt-20">

            <button
              id="agregar-imagen"
              className={isActiveUploadImages ? "" : 'h-3/5 w-3/5 pb-4 group hover:cursor-pointer'}
              onClick={openImageOverlay}>

              <FontAwesomeIcon
                className="text-4xl text-gray-400 group-hover:text-gray-300"
                icon={faImage}
              />
              <p className="mt-2 font-bold text-gray-400 group-hover:text-gray-300">
                Subir imágenes aquí
              </p>
            </button>
          </div >

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
        )}

    </>
  );
}

export default Imagenes