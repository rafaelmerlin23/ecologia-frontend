import { useEffect } from "react"



export const Landing = () => {
    return(
        <p>f</p>
    )
}

export const Home = () => {
    useEffect(()=>{
     },[])
    return(
        <>

        </>
    )
}

export const DashBoard = () => <h2>DashBoard Page (Private)</h2>

export const Analytics = () => <h2>Analytics 
    (Private Permission: 'analize')</h2>

export const Admin = () => <h2>Admin (Private, Permission: 'admin')</h2>

