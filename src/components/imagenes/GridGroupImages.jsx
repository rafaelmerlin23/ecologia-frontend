import TarjetaImagen from "./TarjetaImagen"
import Etiquetador from './Etiquetador'
import { useSearchParams } from "react-router-dom"
import { useAuth } from "../../AuthProvider"
import TarjetaImagenMostrarMas from "./TarjetaImagenMostrarMas"
import { useEffect } from "react"

export const GridGroupImages = ({ images, totalIMages, month }) => {

    return (
        <div className="z-10 mb-4 mt-4 p-4 grid grid-cols-2 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 gap-2 p-2">
            {images.map((image, index) => {
                if (index === 6) {
                    return (
                        <div key={image.id} className="relative w-full h-48 bg-gray-300">

                            <TarjetaImagenMostrarMas totalImages={totalIMages} index={index} image={image} month={month} />
                        </div>
                    )
                } else {
                    return (
                        <div key={image.id} className="relative w-full h-48 bg-gray-300">
                            <TarjetaImagen index={index} image={image} />
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default GridGroupImages