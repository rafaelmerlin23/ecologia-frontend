import React, { useEffect } from 'react'
import { useAuth } from '../../AuthProvider'
import handleGetData from '../../helpers/handleGetData'
import MonthImagesGroup from './MonthImagesGroup'
import Etiquetador from './Etiquetador'
import { useParams, useSearchParams } from 'react-router-dom'

function InfiniteScrolling() {

    const { setCardImagePage,setMaxPage,setImage,setDateUbication,shouldRefresh, setBackRoute, isTaggerActive, setIsTaggerActive, setChanges, userData, images, setImages } = useAuth()
    const token = userData.token
    const { albumID, puntoID, proyectoId } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()

    const handlecloseTagger = () => {
        setSearchParams((prev) => {
            prev.delete('is-active-tagger')
            prev.delete('image-page')
            return prev
        })
        setChanges([])
        setIsTaggerActive(false)
    }

    const handleTagger = () => {
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



    useEffect(() => {
        setBackRoute(`/proyectos/${proyectoId}/puntos/${puntoID}/albumes`)
        const endpointImages = `pictures/show_picture_from_album_pages?max_pictures_per_group=${7}&max_groups=${10}&album_id=${albumID}`
        handleGetData(endpointImages, token).then((data) => {
            setImages(data.response)
            console.log("respuesta del servidor: ", data.response)
            setDateUbication(data.response.map((date)=>(
                date.total_pictures
            )))
        })
        if(searchParams.get('is-active-tagger')){
            handleTagger()
        }

    }, [shouldRefresh])
    return (
        <div>
            <Etiquetador handleClose={handlecloseTagger} isActive={isTaggerActive} />
            <div className='flex flex-col justify-center items-center'>
                {images.length > 0 && images.map((image, index) => (
                    <MonthImagesGroup indexImageDate={index} key={index} group={image} />
                ))}

            </div>

        </div>
    )
}

export default InfiniteScrolling