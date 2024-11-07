import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, Link } from 'react-router-dom';
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
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Error404 from './components/Error404';
import ImagesDate from './components/imagenes/ImagesDate';

function PrivateRoute({ element, ...rest }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation()
  return isAuthenticated ? element : <Navigate to={location} />;
}

function App() {

  return (
    <Router>
      <AuthProvider>
        <Navigation/>
        <Routes>
          <Route path='*' element={<Error404/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/crear_cuenta" element={<CreateAccount />} />
          <Route path="/proyectos" element={<PrivateRoute element={<Proyectos />} />} />
          <Route path="/proyectos/:proyectoId/puntos" element={<PrivateRoute element={<Puntos />} />} />
          {/*<Route path="/albumes" element={<PrivateRoute element={<Albumes />} />} />*/}
          <Route path="/proyectos/:proyectoId/puntos/:puntoID/albumes" element={<PrivateRoute element={<Albumes />}></PrivateRoute>} />
          <Route path="/proyectos/:proyectoId/puntos/:puntoID/albumes/:albumID/navbar-imagenes" element={<PrivateRoute element={<NavBarImagenes />}></PrivateRoute>} >
          <Route path='imagenes' element={<Imagenes />} />
          <Route path='imagenes/:fechaImagen/' element={<ImagesDate/>} />
          <Route path='categoria-etiqueta' element={<CategoriaEtiqueta />} />
          </Route>
          <Route path="/" element={<Navigate to="/login" />} />
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

  // Rutas en las que se debe mostrar el componente Navigation
  const rutasPermitidas = [
    "/proyectos",
    "/proyectos/",
    "/proyectos/:proyectoId/puntos",
    "/proyectos/:proyectoId/puntos/",
    "/proyectos/:proyectoId/puntos/:puntoID/albumes",
    "/proyectos/:proyectoId/puntos/:puntoID/albumes/",
    "/proyectos/:proyectoId/puntos/:puntoID/albumes/:albumID/navbar-imagenes/imagenes",
    "/proyectos/:proyectoId/puntos/:puntoID/albumes/:albumID/navbar-imagenes/imagenes/",
    "/proyectos/:proyectoId/puntos/:puntoID/albumes/:albumID/navbar-imagenes/imagenes/:fechaImagen",
    "/proyectos/:proyectoId/puntos/:puntoID/albumes/:albumID/navbar-imagenes/categoria-etiqueta",
    "/proyectos/:proyectoId/puntos/:puntoID/albumes/:albumID/navbar-imagenes/categoria-etiqueta/",
  ];

  // Verifica si la ruta actual es una de las permitidas
  const mostrarNavigation = rutasPermitidas.some((ruta) =>
    new RegExp(`^${ruta.replace(/:[^\s/]+/g, '[^/]+')}$`).test(pathname)
  );

  // Si no es una ruta permitida, no mostrar el componente
  if (!mostrarNavigation) return null;

  return (
    <>
      <nav>
        {pathname !== "/proyectos" && pathname !== "/proyectos/" ? (
          <ul className="fixed top-5 left-5 px-2 py-2 rounded-full bg-blue-700 hover:bg-blue-600">
            <Link className="w-full h-full flex justify-center items-center" to={backRoute}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
          </ul>
        ) : (
          ""  
        )}
        <ul className="z-30 fixed top-5 right-5 px-2 py-2 rounded-full bg-red-700 hover:bg-red-600">
          <button
            onClick={logout}
            className="xl:gap-1 md:gap-1 lg:gap-1 md:flex-row flex-col lg:flex-row xl:flex-row w-full h-full flex justify-center items-center"
          >
            <p>Cerrar</p>
            <p>sesión</p>
          </button>
        </ul>
      </nav>
    </>
  );
}
