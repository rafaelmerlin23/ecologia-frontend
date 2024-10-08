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
          <Route path="/login" element={<Login />} />
          <Route path="/crear_cuenta" element={<CreateAccount />} />
          <Route path="/proyectos" element={<PrivateRoute element={<Proyectos />} />} />
          <Route path="/proyectos/:proyectoId/puntos" element={<PrivateRoute element={<Puntos />} />} />
          {/*<Route path="/albumes" element={<PrivateRoute element={<Albumes />} />} />*/}
          <Route path="/proyectos/:proyectoId/puntos/:puntoID/albumes" element={<PrivateRoute element={<Albumes />}></PrivateRoute>} />
          <Route path="/proyectos/:proyectoId/puntos/:puntoID/albumes/:albumID/navbar-imagenes" element={<PrivateRoute element={<NavBarImagenes />}></PrivateRoute>} >
            <Route path='imagenes' element={<Imagenes />} />
            <Route path='categoria-etiqueta' element={<CategoriaEtiqueta />} />

          </Route>

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App

function Navigation(){
  const { backRoute } = useAuth();
  return (
    <>
      <nav>
      <ul className='fixed top-5 left-5 px-2 py-2 rounded-full bg-blue-700 hover:bg-blue-600'>
            <Link className="w-full h-full flex justify-center items-center" to={backRoute}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
      </ul>
      </nav>
    </>
  )
}
