import TarjetaImagen from "./TarjetaImagen"
import Etiquetador from './Etiquetador'
import { useSearchParams } from "react-router-dom"
import { useAuth } from "../../AuthProvider"

export const GridImagenes = ({ images }) => {
    const {isTaggerActive,setIsTaggerActive} =  useAuth()
    const [searchParams,setSearchParams] = useSearchParams()
            
    const handlecloseTagger = () => {
        setSearchParams((prev) => {
            prev.delete('is-active-tagger')
            prev.delete('image-page')
            return prev
        })
        setIsTaggerActive(false)
    }

    return (
        <div className="  mt-4 p-4 grid grid-cols-2 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 gap-2 p-2">
            <Etiquetador handleClose={handlecloseTagger} isActive={isTaggerActive}/>
            {images.map((image, index) => (
                <div key={image.id} className="relative w-full h-48 bg-gray-300">
                    <TarjetaImagen index={index} image={image} />
                </div>
            ))}
        </div>
    )
}

export default GridImagenes