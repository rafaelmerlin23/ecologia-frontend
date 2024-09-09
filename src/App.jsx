import React, { useState } from 'react'
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Proyectos from './pages/Proyectos'
import Login from './pages/auth/login'

function App() {
  
  const [user,setUser] = useState(null)


  const handleLogin = (userInfo) =>{
    setUser(userInfo)
  }

  const handleLogout = () => {
    setUser(null);
  } 
  
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path='/' element = {<Login onLogin={handleLogin}></Login>}/>
        <Route path='/proyectos' element = { <ProtectedRoute redirectTo='/' user={user}> 
          <Proyectos user={user}></Proyectos>
           </ProtectedRoute>}/>
        </Routes>
    </BrowserRouter>
  )
}

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

export default App