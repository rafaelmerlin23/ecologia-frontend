import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthProvider';
import handleGetData from '../../helpers/handleGetData';
import MonthImagesGroup from './MonthImagesGroup';
import Etiquetador from './Etiquetador';
import { useParams, useSearchParams } from 'react-router-dom';

function InfiniteScrolling() {
    const {
        setCardImagePage,
        setMaxPage,
        setImage,
        setDateUbication,
        shouldRefresh,
        setBackRoute,
        isTaggerActive,
        setIsTaggerActive,
        setChanges,
        userData,
        images,
        setImages
    } = useAuth();

    const token = userData.token;
    const { albumID, puntoID, proyectoId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [initialDate,setInitialDate] = useState('');
    const [endDate,SetEndDate] = useState('');

    const handlecloseTagger = () => {
        setSearchParams((prev) => {
            prev.delete('is-active-tagger');
            prev.delete('image-page');
            return prev;
        });
        setChanges([]);
        setIsTaggerActive(false);
    };

    const handleFilter= (e)=>{
        e.preventDefault()
    }

    

    const handleTagger = () => {
        const endPoint = `pictures/show_picture_from_album?page=${searchParams.get('image-page')}&quantity=${1}&album_id=${albumID}`;

        handleGetData(endPoint, token).then((data) => {
            if (data && data.status === 'success') {
                const newImages = data.response.map((response) => ({
                    link: response[0],
                    id: response[1],
                    date: response[2],
                }));
                setImage(newImages[0]);
                setCardImagePage(Number(searchParams.get('image-page')));
                setIsTaggerActive(true);
                setMaxPage(data.total_pages);
            }
        }).catch((error) => {
            console.error('Error:', error);
        });
    };

    useEffect(() => {
        setBackRoute(`/proyectos/${proyectoId}/puntos/${puntoID}/albumes`);
        const endpointImages = `pictures/show_picture_from_album_pages?max_pictures_per_group=${7}&max_groups=${10}&album_id=${albumID}`;
        handleGetData(endpointImages, token).then((data) => {
            setImages(data.response);
            console.log("respuesta del servidor: ", data.response);
            setDateUbication(data.response.map((date) => date.total_pictures));
        }).catch((error) => {
            console.error('Error al cargar las imágenes:', error);
        });

        // Llamar a handleTagger solo si 'is-active-tagger' está en los parámetros de búsqueda y las imágenes están cargadas
        if (searchParams.get('is-active-tagger')) {
            handleTagger();
        }

    }, [isTaggerActive,shouldRefresh]);

    return (
        <div>
            <Etiquetador handleClose={(e)=>handlecloseTagger(e)} isActive={isTaggerActive} />
            
            <form onSubmit={handleFilter} className='mb-10 w-screen flex justify-center items-center  gap-5 flex-col'>
                <div className='flex flex-col sm:flex-row gap-5'>
                    <div className='flex flex-col gap-y-2 items-center'>
                        <label
                        htmlFor='init-date'
                        className='text-2xl text-gray-400'>Inicio</label>
                        <input
                        value={initialDate}
                        onChange={(e) => setInitialDate(e.target.value)} 
                        id = "init-date"
                        type='month' 
                        className='text-center px-2 rounded-md bg-zinc-700 text-white text-2xl'/>
                    </div>
                    <div className='flex flex-col gap-y-2 items-center'>
                        <label
                        htmlFor='end-date'
                        className='text-2xl text-gray-400'>Final</label>
                        <input 
                        value={endDate}
                        onChange={(e) => SetEndDate(e.target.value)}
                        id = "end-date"
                        type='month' 
                        className='text-center px-2 rounded-md bg-zinc-700 text-white text-2xl'/>
                    </div>
                </div>
                <button 
                type='submit'
                className='text-2xl bg-blue-600 px-2 rounded-md'> Filtrar</button>
            </form>

            <div className='flex flex-col justify-center items-center'>
                {images.length > 0 && images.map((image, index) => (
                    <MonthImagesGroup indexImageDate={index} key={index} group={image} />
                ))}
            </div>
        </div>
    );
}

export default InfiniteScrolling;
