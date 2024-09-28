import ImagenTarjeta from "./imagenes/ImagenTarjeta"
export const TarjetaEnvoltorio = ({ imagen, children }) => {

    return (
        <div className='bg-gray-800 hover:bg-gray-700 rounded-2xl'>
            <div className="mt-0 aspect-[12/8] my-4 ">
                <ImagenTarjeta link={imagen} />
                <div className="flex flex-col justify-between p-4 leading-normal md:text-lg">
                    {children}

                </div>
            </div>
        </div>
    )
}

export default TarjetaEnvoltorio