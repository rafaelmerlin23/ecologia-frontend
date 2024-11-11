import React, { useState } from 'react'
import GridProyecto from '../components/GridProyecto'
import { useEffect } from 'react';
import { useAuth } from '../AuthProvider';
import CrearProyecto from '../components/CrearProyecto'

const Proyectos = () => {

  const { userData } = useAuth()
  const [isActiveCreateOverlay, setIsActiveCreateOverlay] = useState(false)

  const openCreateProject = () => {
    setIsActiveCreateOverlay(true)
  }
  const closeCreateProject = () => {
    setIsActiveCreateOverlay(false)
  }

  useEffect(() => {
    console.log(userData)
    // Cambiar la clase del body cuando el componente se monta
    document.body.className = "bg-gradient-to-r from-gray-900 to-blue-gray-950";
    // Limpiar las clases al desmontar el componente
    return () => {
      document.body.className = "bg-black";
    };
  }, []);

  return (
    <>
      <CrearProyecto isActive={isActiveCreateOverlay} closeCreateProject={closeCreateProject}></CrearProyecto>
      <div className=' bg-transparent p-6 flex items-center justify-center h.screen
       '>
        <button id='boton_de_crear' onClick={openCreateProject} className='mt-32 flex items-center justify-center bg-gradient-to-r from-sky-900 to-sky-950 rounded-2xl w-1/2 py-5 text-3xl font-bold hover:opacity-70 transition duration-200 ease-in-out '>Agregar Proyecto</button>
      </div>
      <GridProyecto />
    </>
  )
}


export default Proyectos