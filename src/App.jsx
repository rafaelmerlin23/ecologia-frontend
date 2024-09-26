import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Proyectos from './pages/Proyectos';
import Puntos from './pages/Puntos';
import { AuthProvider, useAuth } from './AuthProvider';
import Albumes from './pages/Albumes';
import Imagenes from './pages/Imagenes';
import CreateAccount from './pages/auth/CreateAccount';
import NavBarImagenes from './components/imagenes/NavBarImagenes';
import CategoriaEtiqueta from './pages/CategoriaEtiqueta';
import Etiquetador from './components/imagenes/Etiquetador';

function PrivateRoute({ element, ...rest }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
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

// function Navigation(){
//   return (
//     <>

//     <nav className=''>
//       <ul>
//         <li>
//         <Link to="proyectos"> proyectos </Link>
//         </li>

//       </ul>
//     </nav>
//     </>
//   )
// }
