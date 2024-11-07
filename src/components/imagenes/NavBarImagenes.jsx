import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faImage, faTag } from '@fortawesome/free-solid-svg-icons';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';

export const NavBarImagenes = () => {
    const location = useLocation();
    const {logout,backRoute} = useAuth()
    const { hash, pathname, search } = location;
    const {puntoID,proyectoId } = useParams()   
    const baseClass = "py-2  flex justify-center items-center m-0 p-0  w-2/3 "
    const bottomImagesClass = pathname.includes("navbar-imagenes/imagenes") ?`rounded-s-full bg-blue-900 ${baseClass} `: `rounded-s-full ${baseClass} hover:bg-blue-600`
    const bottomTagsClass = pathname.includes("navbar-imagenes/categoria-etiqueta") ?`rounded-e-full bg-blue-900 ${baseClass} `: `rounded-e-full ${baseClass} hover:bg-blue-600`
    const rutasPermitidas = [
        "/proyectos/:proyectoId/puntos/:puntoID/albumes/:albumID/navbar-imagenes/imagenes",
        "/proyectos/:proyectoId/puntos/:puntoID/albumes/:albumID/navbar-imagenes/imagenes/",
        "/proyectos/:proyectoId/puntos/:puntoID/albumes/:albumID/navbar-imagenes/categoria-etiqueta",
        "/proyectos/:proyectoId/puntos/:puntoID/albumes/:albumID/navbar-imagenes/categoria-etiqueta/",
        "/proyectos/:proyectoId/puntos/:puntoID/albumes/:albumID/navbar-imagenes/imagenes/:fechaImagen",

      ];
    
      // Verifica si la ruta actual es una de las permitidas
      const mostrarNavigation = rutasPermitidas.some((ruta) =>
        new RegExp(`^${ruta.replace(/:[^\s/]+/g, '[^/]+')}$`).test(pathname)
      );
    
      // Si no es una ruta permitida, no mostrar el componente
      if (!mostrarNavigation) return null;

    return (
        <div className="">
            <nav
                id="navbar-image"
                className="fixed top-5 left-0 w-full z-30 flex justify-center items-center flex-col p-0 m-0">
                <ul className='fixed top-5 left-5 px-2 py-2 rounded-full bg-blue-700 hover:bg-blue-600'>
                    <Link className="w-full h-full flex justify-center items-center" to={backRoute}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                </ul>
               
                <ul className="p-0 m-0 w-1/6 border-none rounded-full bg-blue-700 text-gray-200 flex flex-row justify-center items-center">

                    <li className={bottomImagesClass}>
                        <Link className="w-full h-full flex justify-center items-center" to={'imagenes'}>
                            <FontAwesomeIcon icon={faImage} />
                        </Link>
                    </li>
                    <li className={bottomTagsClass}>
                        <Link className="w-full h-full flex justify-center items-center" to={'categoria-etiqueta'}>
                            <FontAwesomeIcon icon={faTag} />
                        </Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
};

export default NavBarImagenes
