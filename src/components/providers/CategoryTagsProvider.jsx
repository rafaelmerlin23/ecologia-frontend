import React, { createContext, useState, useContext } from 'react';

const CategoryTagsContext = createContext()

export const CategoryTagsProvider = ({ children }) => {
    const [categories, setCategories] = useState([])

    const [allTags, setAllTags] = useState({})

    return (
        <CategoryTagsContext.Provider value={{
            categories,
            setCategories,
            allTags,
            setAllTags
        }}>
            {children}
        </CategoryTagsContext.Provider>
    )
}

export const useCategoryTags = () => useContext(CategoryTagsContext)