import React from 'react'

function ImagenTarjeta({ link }) {
    return (
        <>
            {link ? (
                <img src={link} alt="burning" className="rounded-t-lg  h-48 min-h-[8rem] bg-gray-200 aspect-[16/9] object-cover w-full h-full" />
            ) : (
                <div className="h-48 min-h-[8rem] bg-gray-200 aspect-[16/9] flex items-center justify-center w-full h-full">
                    <p className="text-gray-500">No Image Available</p>
                </div>
            )}
        </>
    )
}

export default ImagenTarjeta