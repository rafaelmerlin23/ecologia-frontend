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
    , isTaggerActive
    , setIsTaggerActive
    , quantityImagePerPage
    , setPageImage
    , pageImage
    , images
    , setImages
    , shouldRefresh
    , userData
    , albumInformation
    , setAlbumInformation } = useAuth()
  const [isLoadingImage, setIsLoadingImage] = useState(false)
  const token = userData.token
  const [searchParams, setSearchParams] = useSearchParams()
  const [maxPage, setMaxPage] = useState(1)
  const { albumID } = useParams()


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
        setIsTaggerActive(true)
      }
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  useEffect(() => {
    if (searchParams.get('is-active-tagger')) {
      handleTagger()
    }
    // Actualizar los parámetros de búsqueda si es necesario
    const currentPage = Number(searchParams.get("page")) || 1; // Usa un valor por defecto
    setPageImage(currentPage)

    // Actualiza los parámetros de búsqueda si es necesario
    setSearchParams(params => {
      params.set("page", currentPage);
      return params;
    });

    setAlbumInformation((albumInformation) => ({ ...albumInformation, index: albumID }))
    setIsLoadingImage(false)


    fetch(`${prefixUrl}pictures/show_picture_from_album?page=${searchParams.get('page')}&quantity=${quantityImagePerPage}&album_id=${albumID}`, {
      method: 'GET',
      headers: {
        'Authorization': token // Envía el token en el encabezado Authorization
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.status == 'success') {
          setMaxPage(data.total_pages)
          const newImages = data.response.map((response) => (
            {
              link: response[0],
              id: response[1],
              date: response[2],
            }
          ))
          setImages(newImages)
          setIsLoadingImage(true)
        }

      })
      .catch((error) => {
        console.error('Error:', error);
      });


    document.body.className = ' bg-gradient-to-r from-gray-900 to-blue-gray-950 ';
    return () => {
      document.body.className = 'bg-black';
    };

  }, [shouldRefresh, pageImage]);



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
            <GridImagenes images={images} />
            <Paginacion handleNext={handleNext} handlePrevious={handlePrevious} maxPage={maxPage} />
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