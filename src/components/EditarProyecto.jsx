import Overlay from './Overlay'
import '../App.css'
const EditarProyecto = ({proyecto,esActivoEditar,cerrarEditar}) =>{
    if(!esActivoEditar)return null

    return(
        <>
            <Overlay animacion={cerrarEditar}>
                <p className='font-bold text-2xl'>Coloca el nombre del proyecto</p>
                <form className='border border-gray-700 parent-focus-within inline-flex items-center bg-gray-600 rounded-2xl pl-6' action="">
                    <input placeholder='Proyecto oaxaca' value={proyecto} name={proyecto}  className='focus:outline-none text-2xl text-gray-300 bg-gray-600 p-2' type="text" max={50} />
                    <button className='pb-3 ml-4 flex items-center justify-center bg-blue-500 p-3 rounded-r-2xl transition ease-in-out delay-10 hover:bg-blue-400'>confirmar</button>
                </form>

            </Overlay>
        </>
    )

}

export default EditarProyecto