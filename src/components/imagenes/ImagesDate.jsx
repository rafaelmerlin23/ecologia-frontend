import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../AuthProvider'

function ImagesDate() {
    const {albumID,proyectoId,puntoID,fechaImagen} = useParams()
    const {setBackRoute,backRoute} = useAuth()
    
    
    useEffect(()=>{
        setBackRoute(`/proyectos/${proyectoId}/puntos/${puntoID}/albumes/${albumID}/navbar-imagenes/imagenes/`)    
    },[])

    return (
        <div className='h-screen w-screen text-7xl flex justify-center items-center '>{fechaImagen}</div>
    )
}

export default ImagesDate