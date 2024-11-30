import { useEffect, useState } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../AuthProvider'
import GridImages from './GridImagenes'
import { Paginacion } from './Paginacion'
import FilterImagesDate from './FilterImagesDate'
import HandleFetchPictures from '../../helpers/HandleFetchPictures'

function ImagesMenu() {
  const { albumID, proyectoId, puntoID, fechaImagen } = useParams()
  const {setFilter,filter, setImages, images, setIsTaggerActive, setCardImagePage, setImage, setMaxPage, setPageImage, pageImage, setBackRoute, backRoute, userData, quantityImagePerPage } = useAuth()
  const token = userData.token
  const [searchParams, setSearchParams] = useSearchParams()
  const [maxPageGrid, setMaxPageGrid] = useState(1)
  const location = useLocation()
  
  useEffect(()=>{
    if(location.pathname !== "/imagenes"){
      console.log("formData con esas madres")
      const updatedFormData = new FormData();
      filter.forEach((value, key) => {
        updatedFormData.append(key, value);
      });

      // Agrega o actualiza el valor del nuevo campo
      updatedFormData.delete('projects');
      updatedFormData.delete('locations');
      updatedFormData.delete('albums');
      updatedFormData.append('projects',proyectoId );
      updatedFormData.append('locations',puntoID );
      updatedFormData.append('albums',albumID );
      setFilter(updatedFormData)
    }else{
      console.log("formData vacio")
      setFilter(new FormData())
    }
  },[location.pathname])



  const handleTagger = () => {

    // remplazar aqui tambien
    // const endPoint = `pictures/show_picture_from_album?page=${searchParams.get('image-page')}&quantity=${1}&album_id=${albumID}`

    // handleGetData(endPoint, token).then((data) => {
    //   if (data && data.status == 'success') {
    //     const newImages = data.response.map((response) => (
    //       {
    //         link: response[0],
    //         id: response[1],
    //         date: response[2],
    //       }
    //     ))
    //     setImage(newImages[0])
    //     setCardImagePage(Number(searchParams.get('image-page')))
    //     setIsTaggerActive(true)
    //     setMaxPage(data.total_pages)
    //   }
    // }).catch((error) => {
    //   console.error('Error:', error);
    // });
    const getData = async() =>{
      const form = new FormData()
      form.append('projects',proyectoId );
      form.append('locations',puntoID );
      form.append('albums',albumID );
      form.append('max_groups', 1);
      form.append('page', searchParams.get('image-page'));
      const data = await HandleFetchPictures(form)
      const newImages = data.filtered_pictures.map((picture)=>({
        link:picture.url,
        id:picture.id,
        date: picture.date
      }))
      console.log("se muestra esto",data.total_pages)
      setImage(newImages[0])
      setCardImagePage(Number(searchParams.get('image-page')))
      setIsTaggerActive(true)
      setMaxPage(data.total_pages)
    } 
    getData()
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

    // remplazar esta api por la que te di
    // handleGetData(pictureEndpoint, token).then(data => {
    //   if (data && data.response) {
    //     console.log(data)
    //     setImages(data.response);
    //     const newData = data.response.map((image) => ({
    //       link: image[0],
    //       id: image[1],
    //       date: image[2]
    //     }))
    //     console.log(newData)
    //     console.log("se hizo", data.total_pages)
    //     setImages(newData)
    //     setMaxPageGrid(data.total_pages)
    //   }
    // }).catch((error) => {
    //   console.error(error)
    // })

    const getData = async ()=>{
      const data = await HandleFetchPictures(filter)
      console.log("datos datos datos",data)
      const newData = data.filtered_pictures.map((picture)=>({
        link:picture.url,
        id:picture.id,
        date: picture.date
      }))
      setImages(newData)
      setMaxPageGrid(data.total_pages)
    }

    filter && getData()
   
    const formObject = Object.fromEntries(filter.entries());
    console.log("esta chimoltrufiada",formObject);

    if (searchParams.get('is-active-tagger')) {
      handleTagger()
    }
  }, [pageImage, maxPageGrid,filter])

  return (
    <div className=' flex flex-col justify-center items-center w-full'>
      <section>
        <FilterImagesDate />

      </section>
      <GridImages images={images} />
      <Paginacion handleNext={handleNext} handlePrevious={handlePrevious} maxPage={maxPageGrid} />
    </div>
  )
}

export default ImagesMenu