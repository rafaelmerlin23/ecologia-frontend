import React, { createContext, useState, useContext } from 'react';

const ProjectStructContext = createContext()

export const ProjectStructProvider = ({ children }) => {
    const [projectInformation, setProjectInformation] = useState(null)

    const [locationInformation, setLocationInformation] = useState(null)

    const [albumInformation, setAlbumInformation] = useState(null)

    const [isLoadingStructure, setIsLoadingStructure] = useState({ project: false, location: false, album: false })

    const [deleteInformation, setDeleteInformation] = useState({})

    const [imagesInformation, setImagesInformation] = useState([])


    return (
        <ProjectStructContext.Provider value={{
            setProjectInformation
            , projectInformation
            , locationInformation
            , setLocationInformation
            , albumInformation
            , setAlbumInformation
            , isLoadingStructure
            , setIsLoadingStructure
            , deleteInformation
            , setDeleteInformation
            , imagesInformation
            , setImagesInformation

        }}>
            {children}
        </ProjectStructContext.Provider>
    )
}

export const useProjectStruct = () => useContext(ProjectStructContext)