import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const [userData, setUserData] = useState(null)

    const [shouldRefresh, setShouldRefresh] = useState(false)

    const [projectInformation, setProjectInformation] = useState(null)

    const [locationInformation,setLocationInformation] = useState(null)

    const [albumInformation,setAlbumInformation] = useState(null)

    const [files,setFiles] = useState(null)

    const refreshProjects = () => {
        setShouldRefresh(prev => !prev);
    };

    const login = (data) => {
        setIsAuthenticated(true)
        setUserData(data)
    }
    const logout = () => {
        setIsAuthenticated(false)
        setUserData(null)
    }



    return (
        <AuthContext.Provider value={{
            isAuthenticated
            ,userData
            ,login
            ,logout
            ,refreshProjects
            ,shouldRefresh
            ,setProjectInformation
            ,projectInformation
            ,locationInformation
            ,setLocationInformation
            ,albumInformation
            ,setAlbumInformation
            ,files
            ,setFiles
        }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext)
}