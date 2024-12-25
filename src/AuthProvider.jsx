import React, { createContext, useState, useContext, useEffect, useMemo } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useLocation, useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const [userData, setUserData] = useState(null)

    const [shouldRefresh, setShouldRefresh] = useState(false)



    const [userName, setUserName] = useState(null)

    //prospecto a eliminar
    const [backRoute, setBackRoute] = useState('/proyectos')

    const [projectsPath, setProjectsPath] = useState('/gestor/proyectos')


    //prospecto a eliminar
    const [indexDateUbicationImagesDate, setIndexDateUbicationImagesDate] = useState(1)

    //prospecto a eliminar
    const [initialDate, setInitialDate] = useState('');

    //prospecto a eliminar
    const [endDate, SetEndDate] = useState('');





    const navigate = useNavigate()




    const refreshProjects = (acction = () => { }) => {
        acction()
        setShouldRefresh(prev => !prev);
    };



    const login = (data, user) => {
        const token = data.token
        const decoded = jwtDecode(token)
        setIsAuthenticated(true)
        data.decoded = decoded
        data.userName = user
        console.log(data)
        setUserData(data)
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('userData', JSON.stringify(data))
    }
    const logout = () => {
        setIsAuthenticated(false)
        setUserData(null)
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userData');
        navigate("/")
    }


    useEffect(() => {
        const storedIsAuthenticated = localStorage.getItem('isAuthenticated')

        const storedUserData = localStorage.getItem('userData')
        if (storedIsAuthenticated === 'true' && storedUserData) {
            setIsAuthenticated(true)
            setUserData(JSON.parse(storedUserData))
        }

    }, [])

    const memoizedUserData = useMemo(() => userData, [userData])



    return (
        <AuthContext.Provider value={{
            isAuthenticated
            , userData
            , login
            , logout
            , refreshProjects
            , shouldRefresh

            , setUserName
            , userName

            // Eliminar por contenido no usado
            , backRoute
            , setBackRoute

            , projectsPath
            , setProjectsPath

            // Eliminar por contenido no usado
            , indexDateUbicationImagesDate
            , setIndexDateUbicationImagesDate
            , initialDate
            , setInitialDate
            , endDate
            , SetEndDate




        }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext)
}