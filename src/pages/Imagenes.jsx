import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faImages, faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons';
import SubirImagenes from "../components/imagenes/SubirImagenes";
import { useAuth } from "../AuthProvider";
import prefixUrl from "../helpers/ip";
import GridImagenes from "../components/imagenes/GridImagenes";
import loading from '../assets/loading.gif'
import { useParams } from "react-router-dom";

function Imagenes() {
  const [isActiveUploadImages, setIsActiveUploadImages] = useState(false);
  const { setPageImage, pageImage, images, setImages, shouldRefresh, userData, setAlbumInformation } = useAuth()
  const [isNextPage, setIsNextPage] = useState(false)
  const [isLoadingImage, setIsLoadingImage] = useState(false)
  const token = userData.token

  const {albumID} = useParams()

  const quantity = 20


  const handleNext = () => {
    if (isNextPage) {
      setPageImage((pageImage) => pageImage + 1)
    }
  }

  const handlePrevious = () => {
    if (pageImage !== 1) {
      setPageImage((pageImage) => pageImage - 1)
    }
  }

  const openImageOverlay = () => {
    setIsActiveUploadImages(true)
  }
  const closeImageOverlay = () => {
    setIsActiveUploadImages(false)
  };

  useEffect(() => {
    
    setAlbumInformation((albumInformation)=>({...albumInformation,index:albumID}))
    setIsLoadingImage(false)
    // let getImages = []
    // for (let i = 0; i < 20; i++) {
    //   getImages.push({ id: i, date: '21/12/2024', link: imagenStock })
    // }

    // setImages(getImages)
    /*
      esto podria ir dentro de la peticion serian dos peticiones una con la pagina que quieres
      y otra con la siguiente para comprobar si existen datos y poder dibujar el boton de siguiente
      de lo contrario no se dibujará    
    */



    fetch(`${prefixUrl}pictures/show_picture_from_album?page=${pageImage}&quantity=${quantity}&album_id=${albumID}`, {
      method: 'GET',
      headers: {
        'Authorization': token // Envía el token en el encabezado Authorization
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.status == 'success') {
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

    fetch(`${prefixUrl}pictures/show_picture_from_album?page=${pageImage + 1}&quantity=${quantity}&album_id=${albumID}`, {
      method: 'GET',
      headers: {
        'Authorization': token // Envía el token en el encabezado Authorization
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Respuesta del servidor:', data);
        if (data && data.status == 'success') {
          if (data.response.length === 0) {
            setIsNextPage(false)
          } else {
            setIsNextPage(true)
          }
        }

      })
      .catch((error) => {
        console.error('Error:', error);
      });
    document.body.className = ' bg-gradient-to-r from-gray-900 to-blue-gray-950 ';
    return () => {
      document.body.className = 'bg-black';
    };

  }, [pageImage, shouldRefresh]);

  useEffect(() => {
    setPageImage(1)
  }, [])

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
            {pageImage === 1 && !isNextPage ? "" : <footer className="mb-10 mt-6 flex bg-blue-700 px-6 flex-row rounded-full">
              {pageImage !== 1 ? <button onClick={handlePrevious} className="p-0 m-0 pr-2">
                <FontAwesomeIcon className="pr-2" icon={faLessThan} />
                Ant
              </button> : ""}
              <p>|</p>
              {isNextPage ?
                <button onClick={handleNext} className="p-0 m-0 pl-2">
                  Sig
                  <FontAwesomeIcon className="pl-2" icon={faGreaterThan} />
                </button> : ""}
            </footer>}
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