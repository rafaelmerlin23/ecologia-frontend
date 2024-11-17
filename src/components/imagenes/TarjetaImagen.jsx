import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../AuthProvider";
import { handleDateTime } from "../../helpers/formatDate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useParams, useSearchParams } from "react-router-dom";

export const TarjetaImagen = ({ indexImageDate,image, index }) => {
    const [isHover, setIsHover] = useState(false);
    const containerRef = useRef(null); // Usamos useRef para acceder al contenedor
    const {
        dateUbication
        ,setIsTaggerActive
        , setImage
        , pageImage
        , setCardImagePage
        , quantityImagePerPage } = useAuth();
    const [SearchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const { hash, pathname, search } = location;
    const { proyectoId, puntoID, albumID, fechaImagen } = useParams()

  
    const handleMouseOver = () => {
        setIsHover(true);
    };

    const handleMouseOut = () => {
        setIsHover(false);
    };

    const handleOpenTagger = () => setIsTaggerActive(true);
    const handleInitImage = () => {
        let pageImageNumber = 1;
        if (pathname === `/gestor/proyectos/${proyectoId}/puntos/${puntoID}/albumes/${albumID}/imagenes/` ||
            pathname === `/gestor/proyectos/${proyectoId}/puntos/${puntoID}/albumes/${albumID}/imagenes`
        ) {
            console.log("estas en imagenes")
            // calcula la pocision de la imagen sumando en que numero de grid esta
            let ImagePosition = 0
            for(let i = 0;i < indexImageDate;i++){
                ImagePosition+= dateUbication[i]
            }
            pageImageNumber = (index + 1) + ImagePosition   
        } else {
            const ImagePosition = SearchParams.get('image-position') ? Number(SearchParams.get('image-position')) :0 
            pageImageNumber = ((index + 1) + (pageImage - 1) * quantityImagePerPage) + ImagePosition
        }
        setSearchParams((prev) => {
            prev.set("is-active-tagger", true);
            prev.set("image-page", pageImageNumber);
            return prev;
        });
        setCardImagePage(pageImageNumber);
        setImage(image);
        handleOpenTagger();
    };

    // Agregamos el EventListener en el montaje del componente
    useEffect(() => {
        const handleMouseMove = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsHover(false); // Si el mouse está fuera del contenedor, desactivamos el hover
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Limpiamos el EventListener al desmontar el componente
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

   

    return (
        <div
            ref={containerRef} // Añadimos el ref al contenedor
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            className="z-10 relative w-full h-full">
            {!isHover ? (
                <img
                    src={image.link}
                    alt="burning"
                    className="object-cover w-full h-full aspect-[16/9]"
                />
            ) : (
                <div onClick={handleInitImage} className="hover:cursor-pointer">
                    <div className="relative w-full h-48 min-h-[12rem] bg-gray-200 flex items-center justify-center aspect-[16/9]">
                        {image.link ? (
                            <img src={image.link} alt="burning" className="object-cover w-full h-full" />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full">
                                <p className="text-gray-500">No Image Available</p>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="mt-2 flex flex-row justify-center items-center gap-2">
                                <FontAwesomeIcon className="text-1xl" icon={faCalendar} />
                                <p className="font-bold text-2xl text-white">
                                    {handleDateTime(image.date)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default TarjetaImagen;