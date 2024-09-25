import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import { handleDateTime } from "../../helpers/formatDate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';
import Etiquetador from "./Etiquetador";

export const TarjetaImagen = ({ image,index }) => {
    const [isHover, setIsHover] = useState(false);
    const { setImage,pageImage,setCardImagePage } = useAuth()
    const [isTaggerActive,setIsTaggerActive] = useState(false)

    const handleMouseEnter = () => {
        setIsHover(true)
    }

    const handlecloseTagger = () =>setIsTaggerActive(false)

    const handleOpenTagger = () =>setIsTaggerActive(true)


    const handleInitImage = () => {
        setCardImagePage(((index+1) + (pageImage-1)*20))
        setImage(image)
        handleOpenTagger()
    }

    const handleMouseLeave = () => {
        setIsHover(false)
    }
    return (
        <>
            <Etiquetador handleClose={handlecloseTagger} isActive={isTaggerActive}></Etiquetador>
            {!isHover ?
                <img onMouseEnter={handleMouseEnter} src={image.link} alt="burning" className="object-cover w-full h-full aspect-[16/9]" />
                :
                <Link onClick={handleInitImage}>
                <div className="relative w-full h-48 min-h-[12rem] bg-gray-200 flex items-center justify-center aspect-[16/9]" onMouseLeave={handleMouseLeave}>
                    {image.link ? (
                    <img src={image.link} alt="burning" className="object-cover w-full h-full" />
                    ) : (
                    <div className="flex items-center justify-center w-full h-full">
                        <p className="text-gray-500">No Image Available</p>
                    </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className='mt-2 flex flex-row justify-center items-center gap-2'>
                            < FontAwesomeIcon className='text-1xl' icon={faCalendar}/>
                            <p className='font-bold text-2xl text-white'>
                            {handleDateTime(image.date)}
                            </p>
                        </div>
                    </div>
                </div>
                </Link>
            }
        </>
    )
}

export default TarjetaImagen;