import React, { createContext, useState, useContext } from 'react';
import { useImages } from './ImagesProvider';

const FilterImagesContext = createContext()

export const FilterProvider = ({ children }) => {

    const { quantityImagePerPage } = useImages()

    const [ranges, setRanges] = useState({ 0: false, 0.5: false, 1: false, 1.5: false, 2: false, 2.5: false, 3: false })

    const [isActiveSelect, setIsActiveSelect] = useState(true)

    const [projectsToFilter, SetProjectToFilter] = useState([])

    const [groupedTags, setGroupedTags] = useState({}); //

    const [locationToFilter, setLocationToFilter] = useState({})

    const [albumsToFilter, setAlbumsToFilter] = useState({})

    const [dateRange, setDateRange] = useState({ initDate: '', endDate: '' });

    const [selectedOrderFilter, setSelectedOrderFilter] = useState("None");

    const [isCompleteChargeTagsSelector, setIsCompleteChargeTagsSelector] = useState(true);

    const [locationCharge, setLocationCharge] = useState({
        isProjectsCharge: true,
        isLocationCharge: true,
        isAlbumCharge: true,
    })

    const [filter, setFilter] = useState({ 'quantity': quantityImagePerPage })

    const [noTagsFilter, setNotagsFilter] = useState(false)

    return (
        <FilterImagesContext.Provider value={{
            ranges,
            setRanges,
            isActiveSelect,
            setIsActiveSelect,
            projectsToFilter,
            SetProjectToFilter,
            groupedTags,
            setGroupedTags,
            locationToFilter,
            setLocationToFilter,
            albumsToFilter,
            setAlbumsToFilter,
            dateRange,
            setDateRange,
            selectedOrderFilter,
            setSelectedOrderFilter,
            isCompleteChargeTagsSelector,
            setIsCompleteChargeTagsSelector,
            locationCharge,
            setLocationCharge,
            filter,
            setFilter,
            noTagsFilter,
            setNotagsFilter
        }}>
            {children}
        </FilterImagesContext.Provider>
    )
}

export const useFilterImages = () => useContext(FilterImagesContext)