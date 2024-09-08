import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Proyectos from './pages/Proyectos';
import Puntos from './pages/Puntos';
// import Albumes from './Albumes';
import { AuthProvider, useAuth } from './AuthProvider';

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
          <Route path="/proyectos" element={<PrivateRoute element={<Proyectos />} />} />
          <Route path="/puntos" element={<PrivateRoute element={<Puntos />} />} />
          {/*<Route path="/albumes" element={<PrivateRoute element={<Albumes />} />} />*/}
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
