import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../AuthProvider'
import handleGetData from '../../helpers/handleGetData'
import GridImages from './GridImagenes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { Paginacion } from './Paginacion'
import prefixUrl from '../../helpers/ip'

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

function ImagesDate() {
  const { albumID, proyectoId, puntoID, fechaImagen } = useParams()
  const {indexDateUbicationImagesDate,dateUbication, setIsTaggerActive,setCardImagePage,setImage,setMaxPage,setPageImage, pageImage, setBackRoute, backRoute, userData, quantityImagePerPage } = useAuth()
  const token = userData.token
  const [images, setImages] = useState([])
  const month = Number(fechaImagen.slice(0, 2))
  const year = Number(fechaImagen.slice(3, 7))
  const [searchParams, setSearchParams] = useSearchParams()
  const [maxPageGrid, setMaxPageGrid] = useState(1)

  const handleTagger = () => {
    const initialDate =searchParams.get('initial-date')
    const finalDate =searchParams.get('final-date')
        
    const paramsFilters =initialDate &&finalDate?`&startDate=${initialDate}&endDate=${finalDate}`:""
    const endPoint = `pictures/show_picture_from_album?page=${searchParams.get('image-page')}&quantity=${1}&album_id=${albumID}${paramsFilters}`

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

  const getDaysInMonth = (month, year) => {
    // `month` es de 1 a 12, por lo que restamos 1 para ajustarlo al índice (0 a 11)
    return new Date(year, month, 0).getDate();
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



  useEffect(() => {
    

    setBackRoute(`/proyectos/${proyectoId}/puntos/${puntoID}/albumes/${albumID}/navbar-imagenes/imagenes/`)

    const maxDaysInMonth = getDaysInMonth(month, year)
    const maxDate = `${year}-${month}-${maxDaysInMonth}`
    const minDate = `${year}-${month}-01`

    const currentPage = searchParams.get("page") || 1; // Usa un valor por defecto

    // Actualiza los parámetros de búsqueda si es necesario
    setSearchParams(params => {
      params.set("page", currentPage);
      return params;
    });

    setPageImage(currentPage ? Number(currentPage):1)


    const pictureEndpoint = `pictures/show_picture_from_album?startDate=${minDate}&endDate=${maxDate}&album_id=${albumID}&quantity=${quantityImagePerPage}&page=${pageImage}`
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
    let ImagePosition = 0
      if(!searchParams.get('image-position')){
          for(let i = 0;i < indexDateUbicationImagesDate;i++){
              ImagePosition+= dateUbication[i]
          }
          setSearchParams((prev) => {
              prev.set('image-position',ImagePosition)
              return prev;
          });
      } 

    if(searchParams.get('is-active-tagger')){
      handleTagger()
    }
  }, [fechaImagen, pageImage, maxPageGrid])

  return (
    <div className='mt-36 flex flex-col justify-center items-center'>
      <div className='flex justify-center items-center gap-3 mb-4 '>
        <FontAwesomeIcon className='text-2xl text-gray-200' icon={faCalendar} />
        <p
          className='text-center text-2xl text-gray-400  '
        >{`${MONTHS[month]}, ${year}`}</p>
      </div>
      <hr className='w-[70%]' />
      <GridImages images={images} />
      <Paginacion handleNext={handleNext} handlePrevious={handlePrevious} maxPage={maxPageGrid} />
    </div>
  )
}

export default ImagesDate