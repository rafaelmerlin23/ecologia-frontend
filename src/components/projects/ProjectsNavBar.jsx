import { faFolder, faGreaterThan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { Link, Outlet, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom"
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
    const [modalActive,setModalActive] = useState(false)
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 })
    const buttonRef = useRef(null)
    const modalRef = useRef(null)
    const albumParam = `/gestor/proyectos/${proyectoId}/puntos/${puntoID}/albumes/${albumID}/imagenes${searchParams.get('initial-date') && searchParams.get('final-date') ? `?initial-date=${searchParams.get('initial-date')}&final-date=${searchParams.get('final-date')}` : ''}`
    const dateParam = `/gestor/proyectos/${proyectoId}/puntos/${puntoID}/albumes/${albumID}/imagenes/${fechaImagen}`

    const handleClick = (event) => {
        event.stopPropagation(); // Evitar cierre accidental
        const rect = buttonRef.current.getBoundingClientRect();
        setModalPosition({ x: rect.left, y: rect.bottom });
        setModalActive(prev=>!prev); // Abrir el modal si está cerrado
    };
    
    
    const handleCloseNavModal = () => {
        setModalActive(false);
    };

    const handleClickOutside = (event) => {
        if (

            modalRef.current &&
            !modalRef.current.contains(event.target) &&
            buttonRef.current !== event.target
        ) {
            setModalActive(false);
        }
    };
    

    useEffect(() => {
        if (modalActive) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        // Cleanup en caso de que el modal cambie rápido
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalActive]);
    
     
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
            
            <ModalRoutes 
            modalRef={modalRef}
            pathParts={pathParts}
            handleCLose={handleCloseNavModal}
            isActive={modalActive}
            position={modalPosition}
            searchParams={searchParams}
            params={{albumID,proyectoId,puntoID,fechaImagen}}
            path={location.pathname} />

            <div className={`z-30 xl:py-0 lg:py-10 pl-2 flex items-center fixed top-16 left-0  h-14 bg-gray-400 w-screen transition-opacity duration-300 ${isScrolled ? 'opacity-90' : 'opacity-100'}`}>
                <ul className="text-2xl xl:hidden lg:hidden md:flex sm:flex flex-row sm:flex-row md:flex-row">
                {location.pathname !== '/gestor/proyectos' && location.pathname !== `/gestor/proyectos/${proyectoId}/puntos`?
                    <div className="flex flex-row justify-center items-center gap-2">
                        <button 
                            ref={buttonRef}
                            onClick={handleClick}
                            className="mr-4 py-2 pb-4  px-2 rounded-full hover:bg-gray-500 flex justify-center  text-gray-800 font-medium">...</button>
                        <FontAwesomeIcon 
                        className="text-sm text-gray-500 text-center"
                         icon={faGreaterThan}/>
                        <NavElement
                            isNext={puntoID != undefined}
                            name={pathParts.projecName}
                            path={`/gestor/proyectos/${proyectoId}/puntos`}
                            isActive={(proyectoId != undefined 
                            && pathParts.projecName 
                            && `/gestor/proyectos/${proyectoId}/puntos` === location.pathname)
                            || location.pathname === `/gestor/proyectos/${proyectoId}/puntos/${puntoID}/albumes`} />
                        <NavElement
                            isNext={albumID != undefined}
                            name={pathParts.locationName}
                            path={`/gestor/proyectos/${proyectoId}/puntos/${puntoID}/albumes`}
                            isActive={(puntoID != undefined 
                            && pathParts.locationName
                            && location.pathname === `/gestor/proyectos/${proyectoId}/puntos/${puntoID}/albumes`)
                            || albumParam === location.pathname } />
                        <NavElement
                            isNext={fechaImagen != undefined}
                            name={pathParts.albumName}
                            path={albumParam}
                            isActive={(albumID != undefined && pathParts.locationName 
                            && albumParam === location.pathname)
                            || dateParam === location.pathname} />
                        <NavElement
                            isNext={false}
                            name={fechaImagen != undefined ? `${MONTHS[Number(fechaImagen.slice(0,2))]}-${fechaImagen.slice(3,7)}` :""}
                            path={dateParam}
                            isActive={fechaImagen != undefined
                                && dateParam === location.pathname
                            } />
                    </div>
                    :
                    <div className="flex justify-center items-center flex-row">
                        <NavElement
                        isNext={proyectoId != undefined}
                        name={'proyectos'}
                        path={'/gestor/proyectos'}
                        isActive={true} />
                        <NavElement
                        isNext={puntoID != undefined}
                        name={pathParts.projecName}
                        path={`/gestor/proyectos/${proyectoId}/puntos`}
                        isActive={proyectoId != undefined && pathParts.projecName} />
                    </div>
                }

                </ul>
                <ul className="hidden xl:flex lg:flex flex-row text-2xl">
                    <NavElement
                        isNext={proyectoId != undefined}
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
                <p className=" pb-2 pt-2 rounded-full hover:bg-gray-500 px-6  text-center pt-0">
                    {name!=undefined ? name.length >12 ? `${name.slice(0,12)} ...`:name:name}
                </p>
                {isNext ?
                    <FontAwesomeIcon className="text-gray-500 px-6 text-sm text-center" icon={faGreaterThan} />
                    : ""}
            </Link>
        </li>
    )
}
// este es el modal
const ModalRoutes = ({path,modalRef,params,pathParts,isActive,position,handleCLose,searchParams})=>{
    if(!isActive) return null
    const [isScrolled, setIsScrolled] = useState(false)
    const {albumID,proyectoId,puntoID,fechaImagen} = params
    const albumPath = `/gestor/proyectos/${proyectoId}/puntos/${puntoID}/albumes/${albumID}/imagenes${searchParams.get('initial-date') && searchParams.get('final-date') ? `?initial-date=${searchParams.get('initial-date')}&final-date=${searchParams.get('final-date')}` : ''}`
    const dateParam = `/gestor/proyectos/${proyectoId}/puntos/${puntoID}/albumes/${albumID}/imagenes/${fechaImagen}`

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

    return (
            <div
            ref={modalRef}
            className=" relative">
                <div
                className={`z-30 fixed xl:hidden lg:hidden md:flex sm:flex w-60 flex-col gap-2 flex items-start justify-center  bg-gray-400   shadow-xl border border-gray-500 rounded-lg  ${isScrolled ? 'opacity-90' : 'opacity-100'}`}
                style={{
                    top: position.y, // 10px debajo del botón
                    left: position.x-10,
                }}
                >
                    <ModalRouteElement
                        name={'proyectos'}
                        path={'/gestor/proyectos'}
                        isActive={true}
                        onClose={handleCLose} />

                    <ModalRouteElement
                        name={pathParts.projecName}
                        path={`/gestor/proyectos/${proyectoId}/puntos`}
                        isActive={proyectoId != undefined && pathParts.projecName 
                            && `/gestor/proyectos/${proyectoId}/puntos/${puntoID}/albumes` !== path}
                        onClose={handleCLose} />

                        <ModalRouteElement
                        name={pathParts.locationName}
                        path={`/gestor/proyectos/${proyectoId}/puntos/${puntoID}/albumes`}
                        isActive={puntoID != undefined && pathParts.locationName 
                            && `/gestor/proyectos/${proyectoId}/puntos/${puntoID}/albumes` !== path
                            && albumPath !== path}
                        onClose={handleCLose} />

                    <ModalRouteElement
                        name={pathParts.albumName}
                        path={albumPath}
                        isActive={albumID != undefined && pathParts.locationName && albumPath !== path && dateParam !== path}
                        onClose={handleCLose} />
                    
                </div>
            </div>
      );
    
}

const ModalRouteElement = ({ name, path, isActive, onClose }) => {
    const navigate = useNavigate()
  
    const handleClick = () => {
      navigate(path)
      onClose() // Close the modal after navigation
    };
  
    if (!isActive) return null;
  
    return (
      <Link
        to={path}
        className="text-center text-gray-950 w-full hover:bg-gray-500 flex items-center py-2 px-2 justify-start gap-2"
        onClick={handleClick}
      >
        <FontAwesomeIcon
         icon={faFolder} />
        {name}
      </Link>
    )
  }

export default ProjectsNavBar