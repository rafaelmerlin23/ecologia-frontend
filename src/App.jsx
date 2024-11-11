import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, Link, Outlet } from 'react-router-dom';
import Login from './pages/auth/Login';
import Proyectos from './pages/Proyectos';
import Puntos from './pages/Puntos';
import { AuthProvider, useAuth } from './AuthProvider';
import Albumes from './pages/Albumes';
import Imagenes from './pages/Imagenes';
import CreateAccount from './pages/auth/CreateAccount';
import NavBarImagenes from './components/imagenes/NavBarImagenes';
import CategoriaEtiqueta from './pages/CategoriaEtiqueta';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Error404 from './components/Error404';
import ImagesDate from './components/imagenes/ImagesDate';
import { useEffect, useState } from 'react';
import ProjectsNavBar from './components/projects/ProjectsNavBar';

function PrivateRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  )
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
          <Route path="/usuario" element={<p>usuario</p>} />
          <Route path="/cuentas" element={<p>cuentas</p>} />

          {/* Rutas privadas */}
          <Route element={<PrivateRoute />}>
            <Route path="/categoria-etiqueta" element={<CategoriaEtiqueta />} />

            {/* Rutas bajo /gestor */}
            <Route path="/gestor" element={<ProjectsNavBar />}>
              <Route path="proyectos" element={<Proyectos />} />
              <Route path="proyectos/:proyectoId/puntos" element={<Puntos />} />
              <Route path="proyectos/:proyectoId/puntos/:puntoID/albumes" element={<Albumes />} />
              <Route path="proyectos/:proyectoId/puntos/:puntoID/albumes/:albumID/imagenes" element={<Imagenes />} />
              <Route path="proyectos/:proyectoId/puntos/:puntoID/albumes/:albumID/imagenes/:fechaImagen" element={<ImagesDate />} />
            </Route>
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
  const { backRoute, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  // Rutas en las que se debe mostrar el componente Navigation
  const rutasPermitidas = [
    "/gestor/proyectos",
    "/gestor/proyectos/",
    "/usuario",
    "/cuentas",
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
    <div className='p-0  relative'>
      <div
        className={`z-20 p-0 w-screen h-16 bg-gray-700 shadow-md flex items-center justify-end fixed top-0 left-0 right-0 transition-opacity duration-300 ${isScrolled ? 'opacity-90' : 'opacity-70'
          }`}
      >
        <ul className='p-0 text-2xl mr-10 flex items-center flex-row gap-7 '>

          <ListMember isActive={pathname.includes('/usuario')}>
            <Link to={'/usuario'}>
              Usuario
            </Link>
          </ListMember>
          <ListMember isActive={pathname.includes('/cuentas')}>
            <Link to={'/cuentas'}>
              Cuentas
            </Link>
          </ListMember>
          <ListMember isActive={pathname.includes('/categoria-etiqueta')}>
            <Link to={'/categoria-etiqueta'}>
              Categorias/Etiquetas
            </Link>
          </ListMember>
          <ListMember isActive={pathname.includes('/proyectos')}>
            <Link to={'/gestor/proyectos'}>
              Proyectos
            </Link>
          </ListMember>
          <ListMember>
            <Link onClick={logout}>
              <FontAwesomeIcon
                className='text-red-500'
                icon={faRightFromBracket} />
            </Link>
          </ListMember>
        </ul>
      </div>
    </div >
  );
}

const ListMember = ({ children, isActive }) => {

  return (
    <>
      <li className={`${isActive ? 'text-sky-500 border-sky-500 border-b-4' : ''} hover:text-slate-200 hover:border-slate-200 py-3 hover:border-b-4`}>
        {children}
      </li>
    </>
  )
}
