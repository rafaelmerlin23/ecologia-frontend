import TarjetaImagen from "./TarjetaImagen"
export const GridImagenes = ({ images }) => {
    return (
        <div className="mb-4 grid grid-cols-2 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 gap-1 md:gap-4 p-2">
            {images.map((image) => (
                <div key={image.id} className="relative w-full h-48 bg-gray-300">
                    <TarjetaImagen image={image} />
                </div>
            ))}
        </div>
    )
}

export default GridImagenes