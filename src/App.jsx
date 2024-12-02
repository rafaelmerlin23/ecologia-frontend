import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, Link } from 'react-router-dom';
import Login from './pages/auth/Login';
import Proyectos from './pages/Proyectos';
import Puntos from './pages/Puntos';
import { AuthProvider, useAuth } from './AuthProvider';
import Albumes from './pages/Albumes';
import Imagenes from './pages/Imagenes';
import CreateAccount from './pages/auth/CreateAccount';
import CategoriaEtiqueta from './pages/CategoriaEtiqueta';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Error404 from './components/Error404';
import ImagesDate from './components/imagenes/ImagesDate';
import { useEffect, useRef, useState } from 'react';
import ProjectsNavBar from './components/projects/ProjectsNavBar';
import GestorCuentas from './components/Accounts/GestorCuentas';
import Usuario from './components/Accounts/Usuario';
import ImagesLoader from './components/Loaders/ImagesLoader';

function PrivateRoute({ element, ...rest }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation()
  return isAuthenticated ? element : <Navigate to={location} />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navigation />
        <Routes>
          {/* Redirigir raíz a login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Rutas independientes */}
          <Route path="/login" element={<Login />} />
          <Route path="/crear_cuenta" element={<CreateAccount />} />
          <Route path="/usuario" element={<PrivateRoute element={<Usuario />} />} />
          <Route path="/cuentas" element={<PrivateRoute element={<GestorCuentas />} />} />
          <Route path="/imagenes" element={<PrivateRoute element={<Imagenes />} />} />

          {/* Rutas privadas */}
          <Route path="/categoria-etiqueta" element={<PrivateRoute element={<CategoriaEtiqueta />} />} />
          <Route path='/loader' element={<ImagesLoader/>}/>

          {/* Rutas bajo /gestor */}
          <Route path="/gestor" element={<PrivateRoute element={<ProjectsNavBar />} />}>
            <Route path="proyectos" element={<PrivateRoute element={<Proyectos />} />} />
            <Route path="proyectos/:proyectoId/puntos" element={<PrivateRoute element={<Puntos />} />} />
            <Route path="proyectos/:proyectoId/puntos/:puntoID/albumes" element={<PrivateRoute element={<Albumes />} />} />
            <Route path="proyectos/:proyectoId/puntos/:puntoID/albumes/:albumID/imagenes" element={<PrivateRoute element={<Imagenes />} />} />
            <Route path="proyectos/:proyectoId/puntos/:puntoID/albumes/:albumID/imagenes/:fechaImagen" element={<PrivateRoute element={<ImagesDate />} />} />
          </Route>

          {/* Ruta para página 404 */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App

function Navigation() {
  const location = useLocation();
  const { pathname } = location;
  const { backRoute, logout, projectsPath } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const onCloseMenu = () => {
    setIsMenuOpen(false)
  }

  const onOpenMenuOpen = () => {
    setIsMenuOpen(true)
  }

  const rutasPermitidas = [
    "/gestor/proyectos",
    "/gestor/proyectos/",
    "/usuario",
    "/cuentas",
    "/imagenes",
    "/categoria-etiqueta",
    "/categoria-etiqueta/",
    "/gestor/proyectos/:proyectoId/puntos",
    "/gestor/proyectos/:proyectoId/puntos/",
    "/gestor/proyectos/:proyectoId/puntos/:puntoID/albumes",
    "/gestor/proyectos/:proyectoId/puntos/:puntoID/albumes/",
    "/gestor/proyectos/:proyectoId/puntos/:puntoID/albumes/:albumID/imagenes",
    "/gestor/proyectos/:proyectoId/puntos/:puntoID/albumes/:albumID/navbar-imagenes/imagenes/",
    "/gestor/proyectos/:proyectoId/puntos/:puntoID/albumes/:albumID/imagenes/:fechaImagen",
    "/gestor/proyectos/:proyectoId/puntos/:puntoID/albumes/:albumID/imagenes/:fechaImagen/",
  ];

  // Verifica si la ruta actual es una de las permitidas
  const mostrarNavigation = rutasPermitidas.some((ruta) =>
    new RegExp(`^${ruta.replace(/:[^\s/]+/g, '[^/]+')}$`).test(pathname)
  );

  useEffect(() => {
    const handleScroll = () => {
      // Detectar si la posición de desplazamiento es mayor que 0
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Escuchar el evento de scroll
    window.addEventListener('scroll', handleScroll);

    // Limpiar el evento al desmontar el componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  // Si no es una ruta permitida, no mostrar el componente
  if (!mostrarNavigation) return null;

  return (
    <div className='p-0 relative'>

      <div className={`z-30 justify-end items-center h-16 w-screen bg-gray-800  flex xl:hidden lg:hidden md:hidden sm:flex fixed top-0 left-0  right-0 `}>
        <Menu
          handleClose={onCloseMenu}
          isActive={isMenuOpen}
          logout={logout}
          pathname={pathname}
          projectsPath={projectsPath} />
        <button
          onClick={onOpenMenuOpen}
          className=' flex sm:flex xl:hidden lg:hidden md:hidden'>
          <FontAwesomeIcon className='hover:text-blue-100 text-2xl mr-6 text-blue-200' icon={faBars} />
        </button>
      </div>

      <div
        className={`z-30 hidden xl:flex lg:flex md:flex bg-gray-800  p-0 w-screen h-16 shadow-md  items-center justify-end fixed top-0 left-0 right-0 transition-opacity duration-300 ${isScrolled ? 'opacity-90' : 'opacity-70'
          }`}
      >


        <ul className='hidden lg:flex md:flex xl:flex p-0 text-2xl mr-10 items-center flex-row gap-7 '>
          <NavElements
            logout={logout}
            pathname={pathname}
            projectsPath={projectsPath} />
        </ul>

      </div>
    </div >
  );
}

const Menu = ({ pathname, logout, projectsPath, isActive, handleClose }) => {
  const menuRef = useRef(null)

  const handleClickOutside = (event) => {
    if (

      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      handleClose()
    }
  };


  useEffect(() => {
    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    // Cleanup en caso de que el modal cambie rápido
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive]);

  if (!isActive) return
  return (
    <div
      ref={menuRef}
      onClick={handleClose}
      className='z-30 pt-6 gap-6 bg-gray-800 text-1xl xl:hidden lg:hidden md:hidden h-screen w-64 fixed top-0 right-0 flex flex-col'>
      <NavElements logout={logout} pathname={pathname} projectsPath={projectsPath} />
    </div>
  )
}

const NavElements = ({ pathname, logout, projectsPath }) => {
  return (
    <>
      <ListMember isActive={pathname.includes('/usuario')} name={"Usuario"} to={'/usuario'} />

      <ListMember isActive={pathname === ('/imagenes')} name={"Imagenes"} to={'/imagenes'} />

      <ListMember isActive={pathname.includes('/cuentas')} name={"Cuentas"} to={"/cuentas"} />

      <ListMember isActive={pathname.includes('/categoria-etiqueta')} name={"Categorias/Etiquetas"} to={'/categoria-etiqueta'} />

      <ListMember isActive={pathname.includes('/proyectos')} to={projectsPath} name='Proyectos' />

      <ListMember to={"/login"} onClick={logout} >
        <FontAwesomeIcon
          className='text-red-500'
          icon={faRightFromBracket} />
      </ListMember>
    </>
  )
}

const ListMember = ({ name = "", isActive, to, children, onClick = () => { } }) => {
  return (
    <li className='list-none'>
      <Link
        onClick={onClick}
        to={to}>
        <div
          className={`py-2 pl-3 justify-start p-0 flex items-center  hover:text-slate-200 border-b-4 hover:border-slate-200  hover:border-b-4 ${isActive ? 'text-sky-500 border-sky-500' : ' border-gray-800'}`}>
          {name}
          {children}
        </div>
      </Link>
    </li>
  );
};