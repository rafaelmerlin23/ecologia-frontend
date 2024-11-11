import { useEffect, useState } from "react";
import CrearAlbum from "../components/album/CrearAlbum";
import GridAlbum from "../components/album/GridAlbum";

export const Albumes = () => {

  const [isActiveCreate, setIsActiveCreate] = useState(false)
  const openCreateAlbum = () => {
    setIsActiveCreate(true)
  }
  const closeCreateAlbum = () => {
    setIsActiveCreate(false)
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
      <CrearAlbum closeCreateAlbum={closeCreateAlbum} isActive={isActiveCreate}></CrearAlbum>
      <div className=' bg-transparent p-6 flex items-center justify-center h.screen'>
        <button onClick={openCreateAlbum} id='boton_de_crear' className='mt-32 flex items-center justify-center bg-gradient-to-r from-sky-900 to-sky-950 rounded-2xl w-1/2 py-5 text-3xl font-bold hover:opacity-70 transition duration-200 ease-in-out '>Agregar Album</button>
      </div>
      <GridAlbum />
    </>
  )
}
export default Albumes