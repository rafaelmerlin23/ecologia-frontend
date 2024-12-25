import FilterGrouped from "./filterComponents/FiltersGrouped"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import ModalFilters from "./filterComponents/ModalFilters";
import ButtonsTofilter from "./filterComponents/ButtonsTofilter";
import { useAuth } from "../../AuthProvider";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useImages } from "../providers/ImagesProvider";
import { useFilterImages } from "../providers/FilterProvider";

function FilterImagesDate() {
    const [isModalFilterActive, setIsModalFilterActive] = useState(false)

    const {
        projectsToFilter
        , groupedTags
        , locationToFilter
        , albumsToFilter
        , dateRange
        , ranges
        , selectedOrderFilter
        , setFilter
        , setDateRange
        , setGroupedTags
        , setRanges
        , setSelectedOrderFilter
        , setLocationToFilter
        , SetProjectToFilter
        , setAlbumsToFilter
        , noTagsFilter
        , setNotagsFilter

    } = useFilterImages()

    const { setPageImage, quantityImagePerPage } = useImages()


    const location = useLocation()

    const handelCloseModalFilter = () => {
        setIsModalFilterActive(false)
    }

    const handelOpenModalFilter = () => {
        setIsModalFilterActive(true)
    }



    useEffect(() => {
        onReset()
    }, [location.pathname])

    const onSubmit = (e) => {
        e.preventDefault()
        const projects = []
        const ICPs = []
        const tags = []
        let initDate = undefined
        let endDate = undefined
        const locations = []
        const albums = []

        if (dateRange.initDate && dateRange.endDate) {
            console.log(dateRange.initDate)
            console.log(dateRange.endDate)
            endDate = dateRange.endDate
            initDate = dateRange.initDate
        }

        // ordenar por
        // fecha de inicio
        // fecha final
        // etiquetas
        // ICP
        // proyectos
        // puntos
        // albumes

        projectsToFilter.forEach(project => {
            if (project.isSelected) {
                projects.push(project)
            }
        })

        Object.entries(ranges).forEach(([key, value]) => {
            if (value) {
                ICPs.push(key)
            }
        })

        Object.entries(groupedTags).forEach(([categoryName, tagsEach]) => {
            tagsEach.forEach(tag => {
                if (tag.isSelected) {
                    tags.push(tag)
                }
            })
        })

        Object.entries(locationToFilter).forEach(([project, locationsEach]) => {
            locationsEach.forEach(location => {
                if (location.isSelected) {
                    locations.push(location)
                }
            })
        })

        Object.entries(albumsToFilter).forEach(([location, albumsEach]) => {
            albumsEach.forEach(album => {
                if (album.isSelected) {
                    albums.push(album)
                }
            })
        })

        console.log("estos son proyectos: ", projects)
        console.log("estos son los ICPS:", ICPs)
        console.log("estas son las etiquetas:", tags)
        console.log("estas son las locaciones:", locations)
        console.log("estas son las Albumes:", albums)
        console.log("valor de orden seleccinado: ", selectedOrderFilter)
        let query = { 'quantity': quantityImagePerPage }
        initDate && (query.date_begin = initDate)
        endDate && (query.date_end = endDate)

        // (albums || []).forEach((album) => form.append('albums', album.index));
        // (locations || []).forEach((location) => form.append('locations', location.index));
        // (projects || []).forEach((project) => form.append('projects', project.index));
        // (ICPs || []).forEach((score) => form.append('scores', Number(score)));
        // form.append('order', selectedOrderFilter)

        tags.length > 0 && (query.tags = tags.map((tag) => tag.tagID));

        albums.length > 0 && (query.albums = albums.map((album) => album.index));

        locations.length > 0 && (query.locations = locations.map((location) => location.index));

        projects.length > 0 && (query.projects = projects.map((project) => project.index))

        ICPs.length > 0 && (query.scores = ICPs)

        noTagsFilter && (query.rating = 0)

        selectedOrderFilter !== "None" && (query.order = selectedOrderFilter)

        setPageImage(1)
        console.log("consulta", query)
        setFilter(query)
    }

    const onReset = () => {
        setDateRange({ initDate: '', endDate: '' })
        setNotagsFilter(false)
        setGroupedTags({})
        setRanges({ 0: false, 0.5: false, 1: false, 1.5: false, 2: false, 2.5: false, 3: false })
        setSelectedOrderFilter("None")
        SetProjectToFilter([])
        setLocationToFilter({})
        setAlbumsToFilter({})
        setFilter({ quantity: quantityImagePerPage })
        setPageImage(1)
    }

    return (
        <>
            <form onSubmit={onSubmit} className='xl:flex lg:flex hidden md:flex sm:hidden mb-5 w-full flex-col'>

                <div className=''>
                    <FilterGrouped />
                    <ButtonsTofilter handelCloseModalFilter={handelCloseModalFilter} />
                </div>

            </form>
            <ModalFilters
                onSubmit={onSubmit}
                isActive={isModalFilterActive} onClose={handelCloseModalFilter} />
            <button
                onClick={handelOpenModalFilter}
                className='mb-4 xl:hidden lg:hidden md:hidden  sm:flex flex h-10 gap-2 justify-center items-center text-1xl bg-zinc-700 px-2 rounded-md hover:opacity-70 focus:opacity-50'>
                <FontAwesomeIcon className='text-sm' icon={faFilter} /> Abrir filtros
            </button>
        </>
    )
}

export default FilterImagesDate