import React, { useEffect } from 'react'
import DropZone from '../components/imagenes/DropZone';
function Imagenes() {
  useEffect(() => {
    // Cambiar la clase del body cuando el componente se monta
    document.body.className = "bg-gradient-to-r from-gray-900 to-blue-gray-950";
    // Limpiar las clases al desmontar el componente
    return () => {
      document.body.className = "bg-black";
    }
  }, [])



  return (
    <div className='m-20'>
      
      <DropZone/>

    </div>
  )
}

export default Imagenes
