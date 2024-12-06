import TarjetaImagen from "./TarjetaImagen"
import Etiquetador from './Etiquetador'
import { useSearchParams } from "react-router-dom"
import { useAuth } from "../../AuthProvider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

export const GridImagenes = ({ images }) => {
    const { imagesTodelete,isTaggerActive, setIsTaggerActive, setChanges,setImage } = useAuth()
    const [searchParams, setSearchParams] = useSearchParams()


    const handlecloseTagger = () => {
        setSearchParams((prev) => {
            prev.delete('is-active-tagger')
            prev.delete('image-page')
            return prev
        })
        setChanges([])
        setImage({})
        setIsTaggerActive(false)
    }

    return (
       <>
        <div className=" mt-4  p-4 grid grid-cols-2 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 gap-2 p-2">
            <Etiquetador handleClose={handlecloseTagger} isActive={isTaggerActive} />
            {images.map((image, index) => (
                <div key={image.id} className="relative w-full h-48 bg-gray-300">
                    <TarjetaImagen index={index} image={image} />
                </div>
            ))}
        </div>
            {imagesTodelete.length > 0 && 
            <div className="relative z-40">
                <div className="bg-gray-700 px-6 rounded-2xl gap-4 py-2 fixed bottom-0 left-0 flex jutify-center items-center">
                    <button 
                    className="bg-green-500 px-4">
                        <FontAwesomeIcon className="text-white" icon={faDownload}/>
                    </button>
                    <button
                    className="bg-red-500 px-4"
                    >
                        <FontAwesomeIcon className="text-white" icon={faTrash}/>
                    </button>
                </div>
            </div> }
    </>
    )

}

export default GridImagenes