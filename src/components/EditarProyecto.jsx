import Overlay from './Overlay'
const EditarProyecto = ({proyecto,esActivoEditar,cerrarEditar}) =>{
    
    if(!esActivoEditar)return null

    return(
        <>
            <Overlay>
                <p className='font-bold text-1xl'>Coloca el nombre del proyecto</p>
                <form action="">
                    <input value={proyecto} name={proyecto}  className='text-black' type="text" max={50} />
                    <button>confirmar</button>
                </form>

            </Overlay>
        </>
    )

}

export default EditarProyecto