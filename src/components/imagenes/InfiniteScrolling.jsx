import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthProvider';
import handleGetData from '../../helpers/handleGetData';
import MonthImagesGroup from './MonthImagesGroup';
import Etiquetador from './Etiquetador';
import { useParams, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

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
        setImages,
        refreshProjects
    } = useAuth();

    const token = userData.token;
    const { albumID, puntoID, proyectoId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [initialDate,setInitialDate] = useState('');
    const [endDate,SetEndDate] = useState('');
    const [isGoodForm,setIsGoodForm] = useState(true)

    const handlecloseTagger = () => {
        setSearchParams((prev) => {
            prev.delete('is-active-tagger');
            prev.delete('image-page');
            return prev;
        });
        setChanges([]);
        setIsTaggerActive(false);
    };

    const getDaysInMonth = (month, year) => {
        // `month` es de 1 a 12, por lo que restamos 1 para ajustarlo al índice (0 a 11)
        return new Date(year, month, 0).getDate();
      }

    const handleFilter= (e)=>{
        e.preventDefault()
        const initDate = new Date(`${initialDate.slice(0,4)}-${initialDate.slice(5,7)}-01`).toISOString().slice(0,10)
        const maxDayInMonth = getDaysInMonth(Number(endDate.slice(5,7)),Number(endDate.slice(0,4))) 
        const finalDate = new Date(`${endDate.slice(0,4)}-${endDate.slice(5,7)}-${maxDayInMonth}`).toISOString().slice(0,10)
        if(initDate > finalDate){
            setIsGoodForm(false)
            return
        }
        console.log("dia inicial: ", initDate)
        console.log("dia final: ", finalDate)

        const endpointImages = `pictures/show_picture_from_album_pages?max_pictures_per_group=${7}&max_groups=${10}&album_id=${albumID}&start_date=${initDate}&end_date=${finalDate}`;
        handleGetData(endpointImages, token).then((data) => {
            setImages(data.response);
            console.log("respuesta del servidor: ", data.response);
            setDateUbication(data.response.map((date) => date.total_pictures));
        }).catch((error) => {
            console.error('Error al cargar las imágenes:', error);
        });

        setSearchParams((prev) => {
            prev.set('initial-date',initDate)
            prev.set('final-date',finalDate);
            return prev;
        });

    }

    const handleReset=(e)=>{
        if(initialDate == '' && endDate == ''){
            return
        }
        e.preventDefault()
        setSearchParams((prev) => {
            prev.delete('initial-date')
            prev.delete('final-date');
            return prev;
        });
        
    }

    

    const handleTagger = () => {
        const initialDate =searchParams.get('initial-date')
        const finalDate =searchParams.get('final-date')
        
        const paramsFilters =initialDate &&finalDate?`&startDate=${initialDate}&endDate=${finalDate}`:""
        const endPoint = `pictures/show_picture_from_album?page=${searchParams.get('image-page')}&quantity=${1}&album_id=${albumID}${paramsFilters}`;
        console.log(endPoint)
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
        const initialDate =searchParams.get('initial-date')
        const finalDate =searchParams.get('final-date')
        if(initialDate && finalDate){
            setInitialDate(initialDate.slice(0,7))
            SetEndDate(finalDate.slice(0,7))
        }
        const paramsFilters =initialDate &&finalDate?`&start_date=${initialDate}&end_date=${finalDate}`:""
        const endpointImages = `pictures/show_picture_from_album_pages?max_pictures_per_group=${7}&max_groups=${10}&album_id=${albumID}${paramsFilters}`;
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
            
            {images.length > 0?
                <form onSubmit={handleFilter} className='mb-10 w-screen flex justify-center items-center  gap-5 flex-col'>
                <div className='flex flex-col sm:flex-col gap-5'>
                    <div className='flex flex-col xl:flex-row lg:flex-row gap-y-2 gap-5'>
                        <div className='flex flex-col gap-y-2 items-center'>
                            <label
                            htmlFor='init-date'
                            className='text-2xl text-gray-400'>Inicio</label>
                            <input
                            required
                            value={initialDate}
                            onChange={(e) => setInitialDate((initial)=>{
                                setIsGoodForm(new Date(`${e.target.value}-01`) <= new Date(`${endDate}-01`))
                                return e.target.value
                            })} 
                            id = "init-date"
                            type='month' 
                            className= {`${!isGoodForm?'border border-red-500':""} text-center px-2 rounded-md bg-zinc-700 text-white text-2xl`} />
                        </div>
                        <div className='flex flex-col gap-y-2 items-center'>
                            <label
                            htmlFor='end-date'
                            className='text-2xl text-gray-400'>Final</label>
                            <input 
                            required
                            value={endDate}
                            onChange={(e) => SetEndDate(end=>{
                                setIsGoodForm(new Date(`${initialDate}-01`) <= new Date(`${e.target.value}-01`))
                                return e.target.value
                            })}
                            id = "end-date"
                            type='month' 
                            className= {`${!isGoodForm?'border border-red-500':""} text-center px-2 rounded-md bg-zinc-700 text-white text-2xl`} />
                        </div>
                    </div>
                    <div className='justify-end items-center flex flex-row gap-6'>
                        <button 
                        onClick={e=>handleReset(e)}
                        className='h-10 flex justify-center items-center text-1xl bg-amber-950  text-red-500 font-medium px-2 rounded-md hover:opacity-70 focus:opacity-50'> Resetear</button>
                        <button type='submit' className='h-10 gap-2 flex justify-center items-center text-1xl bg-blue-600 px-2 rounded-md hover:opacity-70 focus:opacity-50'> 
                            <FontAwesomeIcon className='text-sm' icon={faFilter}/> Filtrar
                            </button>
                    </div>
                </div>
                {!isGoodForm?<p className='text-1xl text-red-500'>El inicio no puede ser mayor al final</p>:""}
            </form>
            :""}

            <div className='flex flex-col justify-center items-center'>
                {images.length > 0 && images.map((image, index) => (
                    <MonthImagesGroup indexImageDate={index} key={index} group={image} />
                ))}
            </div>
        </div>
    );
}

export default InfiniteScrolling;
