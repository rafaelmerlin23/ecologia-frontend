import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const [userData, setUserData] = useState(null)

    const [shouldRefresh, setShouldRefresh] = useState(false)

    const [projectInformation, setProjectInformation] = useState(null)

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
            , userData
            , login
            , logout
            , refreshProjects
            , shouldRefresh
            , setProjectInformation
            , projectInformation
        }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext)
}