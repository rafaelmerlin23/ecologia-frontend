import { useEffect } from "react";
import AdministrarCuentas from "./AdministrarCuentas"
  

export const GestorCuentas = () => {
  
  useEffect(() => {
      // Cambiar la clase del body cuando el componente se monta
      document.body.className = "bg-gradient-to-r from-gray-900 to-blue-gray-950";
  
      // Limpiar las clases al desmontar el componente
      return () => {
        document.body.className = "bg-black";
      };
    }, []);

  return (
    <div className=" flex-col flex justify-start items-center  mb-10">
      <div className=" pr-10 py-10 bg-gray-700 mt-24 flex flex-col items-start">
        <label className="ml-10 pt-0 mt-0 mb-4 text-3xl ">
          <span className="text-green-400">◉</span> Cuentas disponibles</label>
        <AdministrarCuentas />
      </div>
    </div>

  )
}
/*
  <CrearProyecto isActive={isActiveCreateOverlay} closeCreateProject={closeCreateProject}></CrearProyecto>
      <div className=' bg-transparent p-6 flex items-center justify-center h.screen
       '>
        <button id='boton_de_crear' onClick={openCreateProject} className='mt-32 flex items-center justify-center bg-gradient-to-r from-sky-900 to-sky-950 rounded-2xl w-1/2 py-5 text-3xl font-bold hover:opacity-70 transition duration-200 ease-in-out '>Agregar Proyecto</button>
      </div>
      <GridProyecto />
*/

export default GestorCuentas