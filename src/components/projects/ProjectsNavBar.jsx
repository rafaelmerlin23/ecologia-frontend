import { faGreaterThan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"

export const ProjectsNavBar = () => {
    const location = useLocation()
    const [isScrolled, setIsScrolled] = useState(false)

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
        <div className="relative ">
            <div className={`pl-2 flex items-center fixed top-16 left-0  h-14 z-50 bg-gray-400 w-screen transition-opacity duration-300 ${isScrolled ? 'opacity-90' : 'opacity-100'}`}>
                <ul className="flex flex-row  text-2xl">
                    <NavElement
                        isNext={true}
                        name={'proyectos'}
                        path={'/gestor/proyectos'}
                        isActive={true} />
                    <NavElement
                        isNext={true}
                        name={'proyectos'}
                        path={'/gestor/proyectos'}
                        isActive={true} />
                    <NavElement
                        isNext={true}
                        name={'proyectos'}
                        path={'/gestor/proyectos'}
                        isActive={true} />
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
                    {name}
                </p>
                {isNext ?
                    <FontAwesomeIcon className="px-6 text-sm text-center" icon={faGreaterThan} />
                    : ""}
            </Link>
        </li>
    )
}

export default ProjectsNavBar