import React from 'react'
import { useEffect } from 'react';
function Puntos() {
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
      <div className=' bg-gradient-to-r from-gray-900 to-blue-gray-950 p-6 flex items-center justify-center h.screen'>
      <button className='flex items-center justify-center bg-gradient-to-r from-sky-900 to-sky-950 rounded-2xl w-1/2 py-5 text-3xl font-bold hover:opacity-70 transition duration-200 ease-in-out mt-20'>Agregar punto</button>        
      
      </div>
    </>
  )
}

export default Puntos
