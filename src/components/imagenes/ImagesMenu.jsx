import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../AuthProvider'
import handleGetData from '../../helpers/handleGetData'
import GridImages from './GridImagenes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { Paginacion } from './Paginacion'
import FilterImagesDate from './FilterImagesDate'

function ImagesMenu() {
  const { albumID, proyectoId, puntoID, fechaImagen } = useParams()
  const { setImages, images, setIsTaggerActive, setCardImagePage, setImage, setMaxPage, setPageImage, pageImage, setBackRoute, backRoute, userData, quantityImagePerPage } = useAuth()
  const token = userData.token
  const [searchParams, setSearchParams] = useSearchParams()
  const [maxPageGrid, setMaxPageGrid] = useState(1)



  const handleTagger = () => {

    // const paramsFilters =initialDate &&finalDate?`&startDate=${initialDate}&endDate=${finalDate}`:""
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
        setCardImagePage(Number(searchParams.get('image-page')))
        setIsTaggerActive(true)
        setMaxPage(data.total_pages)
      }
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  // const getDaysInMonth = (month, year) => {
  //   // `month` es de 1 a 12, por lo que restamos 1 para ajustarlo al índice (0 a 11)
  //   return new Date(year, month, 0).getDate();
  // }

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



  useEffect(() => {


    setBackRoute(`/proyectos/${proyectoId}/puntos/${puntoID}/albumes/${albumID}/navbar-imagenes/imagenes/`)


    const currentPage = searchParams.get("page") || 1; // Usa un valor por defecto

    // Actualiza los parámetros de búsqueda si es necesario
    setSearchParams(params => {
      params.set("page", currentPage);
      return params;
    });

    setPageImage(currentPage ? Number(currentPage) : 1)

    // startDate=${minDate}&endDate=${maxDate}
    const pictureEndpoint = `pictures/show_picture_from_album?album_id=${albumID}&quantity=${quantityImagePerPage}&page=${pageImage}`
    handleGetData(pictureEndpoint, token).then(data => {
      if (data && data.response) {
        console.log(data)
        setImages(data.response);
        const newData = data.response.map((image) => ({
          link: image[0],
          id: image[1],
          date: image[2]
        }))
        console.log(newData)
        console.log("se hizo", data.total_pages)
        setImages(newData)
        setMaxPageGrid(data.total_pages)
      }
    }).catch((error) => {
      console.error(error)
    })

    if (searchParams.get('is-active-tagger')) {
      handleTagger()
    }
  }, [pageImage, maxPageGrid])

  return (
    <div className=' flex flex-col justify-center items-center w-full'>
      <FilterImagesDate />
      <GridImages images={images} />
      <Paginacion handleNext={handleNext} handlePrevious={handlePrevious} maxPage={maxPageGrid} />
    </div>
  )
}

export default ImagesMenu