import { faGreaterThan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Link, Outlet, useLocation, useParams, useSearchParams } from "react-router-dom"
import handleGetData from '../../helpers/handleGetData'

import {useAuth} from '../../AuthProvider'

const MONTHS = {
    1: "Enero",
    2: "Febrero",
    3: "Marzo",
    4: "Abril",
    5: "Mayo",
    6: "Junio",
    7: "Julio",
    8: "Agosto",
    9: "Septiembre",
    10: "Octubre",
    11: "Noviembre",
    12: "Diciembre",
  }

export const ProjectsNavBar = () => {
    const location = useLocation()
    const {setProjectsPath,userData} = useAuth()
    const token = userData.token    
    const [isScrolled, setIsScrolled] = useState(false)
    const {albumID,proyectoId,puntoID,fechaImagen}= useParams()
    const [pathParts,setPartPath] = useState({albumName:null,projecName:null,locationName:null})
    const [searchParams, setSearchParams] = useSearchParams()
     
    useEffect(() => {
        
        const handleScroll = () => {
            // Detectar si la posición de desplazamiento es mayor que 0
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll)
        };
    }, []);

    useEffect(()=>{
        if(proyectoId != undefined){
            const endpoint = `projects/get_project_by_id?project_id=${proyectoId}`
            handleGetData(endpoint,token).then((data)=>{
                setPartPath((prev)=>({...prev,projecName:data.response[0][1]}))
            })
        }

        if(puntoID != undefined){
            const endpoint = `projects/get_location_by_id?location_id=${puntoID}`
            handleGetData(endpoint,token).then((data)=>{
                setPartPath((prev)=>({...prev,locationName:data.response[0][1]}))
            })
        }

        if(albumID != undefined){
            const endpoint = `projects/get_album_by_id?album_id=${albumID}`
            handleGetData(endpoint,token).then((data)=>{
                console.log("algo ",data)
                setPartPath((prev)=>({...prev,albumName:data.response[0][2]}))
            })
        }

        const searchParams = location.search
        //guardar path para cuando se cambie de pestaña y se necesite volver al sitio
        setProjectsPath(`${location.pathname}${searchParams}`)
    },[location.pathname,location.search])

    return (
        <div className="relative ">
            <div className={`pl-2 flex items-center fixed top-16 left-0  h-14 z-20 bg-gray-400 w-screen transition-opacity duration-300 ${isScrolled ? 'opacity-90' : 'opacity-100'}`}>
                <ul className="flex flex-row  text-2xl">
                    <NavElement
                        isNext={true}
                        name={'proyectos'}
                        path={'/gestor/proyectos'}
                        isActive={true} />
                    <NavElement
                        isNext={puntoID != undefined}
                        name={pathParts.projecName}
                        path={`/gestor/proyectos/${proyectoId}/puntos`}
                        isActive={proyectoId != undefined && pathParts.projecName} />
                    <NavElement
                        isNext={albumID != undefined}
                        name={pathParts.locationName}
                        path={`/gestor/proyectos/${proyectoId}/puntos/${puntoID}/albumes`}
                        isActive={puntoID != undefined && pathParts.locationName} />
                    <NavElement
                        isNext={fechaImagen != undefined}
                        name={pathParts.albumName}
                        path={`/gestor/proyectos/${proyectoId}/puntos/${puntoID}/albumes/${albumID}/imagenes${searchParams.get('initial-date') && searchParams.get('final-date') ? `?initial-date=${searchParams.get('initial-date')}&final-date=${searchParams.get('final-date')}` : ''}`}
                        isActive={albumID != undefined && pathParts.locationName} />
                    <NavElement
                        isNext={false}
                        name={fechaImagen != undefined ? `${MONTHS[Number(fechaImagen.slice(0,2))]}-${fechaImagen.slice(3,7)}` :""}
                        path={`/gestor/proyectos/${proyectoId}/puntos/${puntoID}/albumes/${albumID}/imagenes/${fechaImagen}`}
                        isActive={fechaImagen != undefined} />
                    
                </ul>
            </div>
            <Outlet />
        </div>
    )
}

const NavElement = ({ name, path, isNext, isActive }) => {
    if (!isActive) return null
    return (
        <li className="flex justify-center items-center ">
            <Link
                to={path}
                className="flex items-center text-center text-gray-800 font-medium">
                <p className="pb-2 rounded-full hover:bg-gray-500 px-6  text-center pt-0">
                    {name!=undefined ? name.length >18 ? `${name.slice(0,18)} ...`:name:name}
                </p>
                {isNext ?
                    <FontAwesomeIcon className="px-6 text-sm text-center" icon={faGreaterThan} />
                    : ""}
            </Link>
        </li>
    )
}

export default ProjectsNavBar