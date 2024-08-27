import React from 'react'

function TarjetaDeproyecto({LinkImagen,nombre,fecha}) {
  return (
    <>
    <div className=' transition ease-in-out delay-10 hover:-translate-y-1 hover:scale-105  duration-10 hover:opacity-70'>
        <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2 ' >
        <button className='bg-black  rounded-full w-6 flex justify-center content-center'>x</button>
        <img src={LinkImagen} alt="incendio" className="rounded-t-lg"/>
            <div className='p-5'>
                <p className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{nombre}</p>
                <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{fecha}</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default TarjetaDeproyecto
