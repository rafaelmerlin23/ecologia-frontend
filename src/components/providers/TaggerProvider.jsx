import React, { createContext, useState, useContext } from 'react';

const TaggerContext = createContext()

export const TaggerProvider = ({ children }) => {

    const [isTaggerActive, setIsTaggerActive] = useState(false)
    const [changes, setChanges] = useState([])
    const [isCategoryMenuActivate, setIsCategoryMenuActivate] = useState(false)
    const [shouldRefreshRatings, setShouldRefreshRatings] = useState(false)


    const refreshRatings = (acction = () => { }) => {
        acction()
        setShouldRefreshRatings(prev => !prev);
    };

    const handleCategoryMenu = () => {
        setIsCategoryMenuActivate(prev => !prev)
    }

    return (
        <TaggerContext.Provider value={{
            shouldRefreshRatings,
            setShouldRefreshRatings,
            refreshRatings,
            isTaggerActive,
            setIsTaggerActive,
            changes,
            setChanges,
            isCategoryMenuActivate,
            setIsCategoryMenuActivate,
            handleCategoryMenu

        }}>
            {children}
        </TaggerContext.Provider>
    )
}

export const useTagger = () => useContext(TaggerContext)