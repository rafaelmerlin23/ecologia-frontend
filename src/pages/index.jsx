import {Navigate} from 'react-router-dom'
import Proyectos from './Proyectos'

export const Landing = () => <h2>Landing page (public)</h2>



export const Home = () => {
    return <h2>Pagina de inicio</h2>
}

export const DashBoard = () => <h2>DashBoard Page (Private)</h2>

export const Analytics = () => <h2>Analytics 
    (Private Permission: 'analize')</h2>

export const Admin = () => <h2>Admin (Private, Permission: 'admin')</h2>

