import React, { useState } from 'react'
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import {Landing,Admin,Analytics,DashBoard,Home} from './pages'
import ProtectedRoute from './components/ProtectedRoute'
import Proyectos from './pages/Proyectos'
function App() {
  
  const [user,setUser] = useState(null)

  const login =() =>{
    ///request done
    setUser({
      id:1,
      name:"john"
    })
  }

  const logout = () =>{
    setUser(null)
  }
  
  return (
    <BrowserRouter>
    <Navigation/>
    {user ? <button onClick={logout}>Logout</button>:<button onClick={login}>loggin</button>}

    <Routes>
    <Route index element = {<Landing/>}/>
    <Route  path='/' element = {<h1>Home</h1>}/>
    <Route path='home' element = {<ProtectedRoute user = {user}>
      <Home/>
    </ProtectedRoute>}/>
    <Route path='dashboard' element = {<DashBoard/>}/>
    <Route path='analytics' element = {<Analytics/>}/>
    <Route path='admin' element = {<Admin/>}/>
    <Route path='proyectos' element = {<Proyectos/>}/>
    
    </Routes>
    </BrowserRouter>
  )
}

function Navigation(){
  return (
    <nav>
      <ul>
        <li>
          <Link to="landing"> Landing </Link>
        </li>
        <li>
        <Link to="home"> Home </Link>
        </li>
        <li>
        <Link to="dashboard"> DashBoard</Link>
        </li>
        <li>
        <Link to="analytics"> Analytics </Link>
        </li>
        <li>
        <Link to="admin"> Admin </Link>
        </li>
        <li>
        <Link to="proyectos"> proyectos </Link>
        </li>
      </ul>
    </nav>
  )
}

export default App