import { Link, Outlet } from "react-router-dom"
import { faImage, faTag } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export const NavBarImagenes = () => {
    return (
        <div className="">
            <nav 
            id="navbar-image"
            className="fixed top-5 left-0 w-full z-30 flex justify-center items-center flex-col p-0 m-0  ">
                <ul className=" p-0 m-0 w-1/6 border-none rounded-full bg-blue-700 text-gray-200 flex flex-row justify-center items-center ">
                    <li className="py-2  rounded-full flex justify-center items-center  m-0 p-0 hover:bg-blue-600  w-2/3">
                        <Link className="w-full h-full flex justify-center items-center" to={'imagenes'}>
                            <FontAwesomeIcon icon={faImage} />
                        </Link>
                    </li>
                    <li className="py-2 rounded-full flex justify-center items-center m-0 p-0 hover:bg-blue-600 w-2/3">
                        <Link className="w-full h-full flex justify-center items-center" to={'categoria-etiqueta'} >
                            <FontAwesomeIcon icon={faTag} />
                        </Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}

export default NavBarImagenes