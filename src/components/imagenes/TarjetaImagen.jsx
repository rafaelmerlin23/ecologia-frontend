import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../AuthProvider";
import { handleDateTime } from "../../helpers/formatDate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useParams, useSearchParams } from "react-router-dom";

export const TarjetaImagen = ({ image, index }) => {
    const [isHover, setIsHover] = useState(false);
    const containerRef = useRef(null); // Usamos useRef para acceder al contenedor
    const { setIsTaggerActive, setImage, pageImage, setCardImagePage, quantityImagePerPage } = useAuth();
    const [SearchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const { hash, pathname, search } = location;
    const { proyectoId, puntoID, albumID, fechaImagen } = useParams()

    // <Route path="/proyectos/:proyectoId/puntos/:puntoID/albumes/:albumID/navbar-imagenes" element={<NavBarImagenes />} >
    //         <Route path='imagenes' element={<Imagenes />} />
    //         <Route path='imagenes/:fechaImagen/' element={<ImagesDate/>} />

    const handleMouseOver = () => {
        setIsHover(true);
    };

    const handleMouseOut = () => {
        setIsHover(false);
    };

    const handleOpenTagger = () => setIsTaggerActive(true);
    const handleInitImage = () => {
        if (pathname === `/proyectos/${proyectoId}/puntos/${puntoID}/albumes/${albumID}/navbar-imagenes/imagenes/` ||
            pathname === `/proyectos/${proyectoId}/puntos/${puntoID}/albumes/${albumID}/navbar-imagenes/imagenes`
        ) {
            console.log("estas en imagenes")
        } else {
            console.log("estas dentro de fecha imagen")
        }
        const pageImageNumber = (index + 1) + (pageImage - 1) * quantityImagePerPage;
        setSearchParams((prev) => {
            prev.set("page", SearchParams.get("page"));
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