import React from 'react'
import GridProyecto from '../components/GridProyecto'
const Proyectos =() => {
 
  return (
    <>
      <div className=' bg-gradient-to-r from-gray-900 to-blue-gray-950 p-6 flex items-center justify-center h.screen
       '>
        <button className='flex items-center justify-center bg-gradient-to-r from-sky-900 to-sky-950 rounded-2xl w-1/2 py-5 text-3xl font-bold hover:opacity-70'>Agregar Proyecto</button>        
      </div>
      <GridProyecto/>
    </>
  )
}


export default Proyectos