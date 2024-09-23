import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthProvider";

export const TarjetaImagen = ({ image }) => {
    const [isHover, setIsHover] = useState(false);
    const { setImage } = useAuth()

    const handleMouseEnter = () => {
        setIsHover(true)
    }

    const handleInitImage = () => {
        setImage(image)
    }

    const handleMouseLeave = () => {
        setIsHover(false)
    }
    return (
        <>
            {!isHover ?
                <img onMouseEnter={handleMouseEnter} src={image.link} alt="burning" className="object-cover w-full h-full" />
                :
                <Link onClick={handleInitImage} to={`${image.id}/etquetador`}>
                    <div className="relative w-full h-48" onMouseLeave={handleMouseLeave}>
                        <img src={image.link} alt="burning" className="object-cover w-full h-full" />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <p className="text-white text-xl font-bold">{image.date}</p>
                        </div>
                    </div>
                </Link>
            }
        </>
    )
}

export default TarjetaImagen;