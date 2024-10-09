import React from 'react'
import { useEffect, useState } from 'react';
import GridPunto from '../components/GridPunto';
import CrearPunto from '../components/CrearPunto';


function Puntos() {
  const [isActiveCreate, setIsActiveCreate] = useState(false)

  const closeCreateLocation = () => {
    setIsActiveCreate(false)
  }

  const openCreateLocation = () => {
    setIsActiveCreate(true)
  }


  useEffect(() => {
    // Cambiar la clase del body cuando el componente se monta
    document.body.className = "bg-gradient-to-r from-gray-900 to-blue-gray-950";

    // Limpiar las clases al desmontar el componente
    return () => {
      document.body.className = "bg-black";
    };
  }, []);
  return (
    <>
      <CrearPunto closeCreateLocation={closeCreateLocation} isActive={isActiveCreate}></CrearPunto>
      <div className=' bg-transparent p-6 flex items-center justify-center h.screen'>
        <button onClick={openCreateLocation} id='agregar_punto' className='flex items-center justify-center bg-gradient-to-r from-sky-900 to-sky-950 rounded-2xl w-1/2 py-5 text-3xl font-bold hover:opacity-70 transition duration-200 ease-in-out '>Agregar punto</button>
      </div>
      <GridPunto />
    </>
  )
}

export default Puntos
