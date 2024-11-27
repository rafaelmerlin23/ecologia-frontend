import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import TagsSelection from './filterComponents/TagsSelection';
import { useAuth } from '../../AuthProvider';
import TagsPopover from './filterComponents/TagsPopover';
import { RangesOptions } from './filterComponents/RangesOptions';
import ProjectsSelection from './filterComponents/ProjectsSelection';
import LocationSelection from './filterComponents/LocationsSelection';
import AlbumSelection from './filterComponents/AlbumSelection';

function FilterImagesDate() {

    const [isGoodForm, setIsGoodForm] = useState(true)
    const [dateRange, setDateRange] = useState({ initDate: '', endDate: '' });
    const { ranges, groupedTags, projectsToFilter, locationToFilter, albumsToFilter } = useAuth()



    const getDaysInMonth = (month, year) => {
        // `month` es de 1 a 12, por lo que restamos 1 para ajustarlo al índice (0 a 11)
        return new Date(year, month, 0).getDate();
    }

    const showRanges = () => {
        console.log("se ejecutó");
        let result = [];
        Object.entries(ranges).forEach(([key, value]) => {
            if (value) {
                result.push(key); // Añade las claves válidas a un array
            }
        });
        return result.length > 0 ? result.join(", ") : "No especificado"; // Une con comas
    };

    const showProjects = () => {
        let result = []
        projectsToFilter.forEach((project) => {
            if (project.isSelected) {
                result.push(project.name)
            }
        })
        return result.length > 0 ? result.join(", ") : "No especificado";
    }

    const showTags = () => {
        console.log("se ejecuto")
        let result = []
        Object.entries(groupedTags).forEach(([categoryName, tags]) => {
            tags.forEach(tag => {
                if (tag.isSelected) {
                    result.push(tag.tagName)
                }
            })
        })

        return result.length > 0 ? result.join(", ") : "No especificado"

    }

    const showLocations = () => {
        console.log("se ejecuto")
        let result = []
        Object.entries(locationToFilter).forEach(([project, locations]) => {
            locations.forEach(location => {
                if (location.isSelected) {
                    result.push(location.name)
                }
            })
        })

        return result.length > 0 ? result.join(", ") : "No especificado"

    }

    const showAlbums = () => {
        console.log("se ejecuto")
        let result = []
        Object.entries(albumsToFilter).forEach(([location, albums]) => {
            albums.forEach(album => {
                if (album.isSelected) {
                    result.push(album.name)
                }
            })
        })

        return result.length > 0 ? result.join(", ") : "No especificado"

    }



    const handleFilter = (e) => {
        e.preventDefault()


    }

    useEffect(() => {
    }, [ranges, groupedTags, projectsToFilter, locationToFilter, albumsToFilter])


    return (
        <div className=''>
            <form onSubmit={handleFilter} className=' mb-10 w-full flex justify-center items-center  gap-5 flex-col'>


                <div className='flex flex-col sm:flex-col gap-5'>
                    <div className='flex flex-col xl:flex-row lg:flex-row gap-y-2 gap-5'>

                        <div className='flex flex-col gap-y-2 items-center'>
                            <p className='text-2xl text-gray-400'>
                                Ordenar por
                            </p>
                            <select
                                className='text-center px-2 w-[300px] h-[36px] rounded-md bg-zinc-700 text-white text-2xl'
                                name="" id="">
                                <option value="None"> Ninguno</option>
                                <option value="score asc">Score ascendente</option>
                                <option value="score desc">Score descendente</option>
                                <option value="fecha asc">Fecha ascendente</option>
                                <option value="fecha desc">Fecha descendente</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-y-2 items-center'>
                            <label
                                htmlFor='init-date'
                                className='text-2xl text-gray-400'>Fecha inicio</label>
                            <input
                                value={dateRange.initDate}
                                onChange={(e) => setDateRange((range) => {
                                    if (range.endDate === '') {
                                        setIsGoodForm(true)
                                        return { ...range, initDate: e.target.value }
                                    }
                                    setIsGoodForm(new Date(`${e.target.value}-01`) <= new Date(`${dateRange.endDate}-01`))
                                    return { ...range, initDate: e.target.value }
                                })}
                                id="init-date"
                                type='month'
                                className={`${!isGoodForm ? 'border border-red-500' : ""}w-[300px] h-[36px] text-center px-2 rounded-md bg-zinc-700 text-white text-2xl`} />
                        </div>
                        <div className='flex flex-col gap-y-2 items-center'>
                            <label
                                htmlFor='end-date'
                                className='text-2xl text-gray-400'>Fecha final</label>
                            <input
                                value={dateRange.endDate}
                                onChange={(e) => setDateRange((range) => {
                                    if (range.initDate === '') {
                                        setIsGoodForm(true)
                                        return { ...range, endDate: e.target.value }
                                    }
                                    setIsGoodForm(new Date(`${e.target.value}-01`) >= new Date(`${dateRange.initDate}-01`))
                                    return { ...range, endDate: e.target.value }
                                })}
                                id="end-date"
                                type='month'
                                className={`${!isGoodForm ? 'border border-red-500' : ""} w-[300px] h-[36px] text-center px-2 rounded-md bg-zinc-700 text-white text-2xl`} />
                        </div>
                        <TagsPopover content={<TagsSelection />} >
                            <div className='flex flex-col gap-y-2 items-center'>
                                <p className='text-2xl text-gray-400'>Etiquetas</p>
                                <div
                                    className='w-[300px] h-[36px] text-center px-2 rounded-md bg-zinc-700 text-white text-2xl overflow-hidden whitespace-nowrap text-ellipsis'>
                                    {showTags()}
                                </div>
                            </div>
                        </TagsPopover>

                    </div>
                    <div className='flex justify-center items-center gap-5'>
                        <TagsPopover content={<RangesOptions />} >
                            <div className='flex flex-col gap-y-2 items-center'>
                                <p className='text-2xl text-gray-400'>ICP</p>
                                <div
                                    className='w-[300px] h-[36px] text-center px-2 rounded-md bg-zinc-700 text-white text-2xl overflow-hidden whitespace-nowrap text-ellipsis'>
                                    {showRanges()}

                                </div>
                            </div>
                        </TagsPopover>

                        <TagsPopover content={<ProjectsSelection />} >
                            <div className='flex flex-col gap-y-2 items-center'>
                                <p className='text-2xl text-gray-400'>Proyectos</p>
                                <div
                                    className='w-[300px] h-[36px] text-center px-2 rounded-md bg-zinc-700 text-white text-2xl overflow-hidden whitespace-nowrap text-ellipsis'>
                                    {showProjects()}
                                </div>
                            </div>
                        </TagsPopover>
                        <TagsPopover isDisabled={showProjects() === 'No especificado'} content={<LocationSelection />} >
                            <div
                                className='flex flex-col gap-y-2 items-center'>
                                <p className='text-2xl text-gray-400'>Puntos</p>
                                <div
                                    className='w-[300px] h-[36px] text-center px-2 rounded-md bg-zinc-700 text-white text-2xl overflow-hidden whitespace-nowrap text-ellipsis'>
                                    {showLocations()}
                                </div>
                            </div>
                        </TagsPopover>

                        <TagsPopover isDisabled={showLocations() === 'No especificado'} content={<AlbumSelection />} >
                            <div className='flex flex-col gap-y-2 items-center'>
                                <p className='text-2xl text-gray-400'>Albumes</p>
                                <div
                                    className='w-[300px] h-[36px] text-center px-2 rounded-md bg-zinc-700 text-white text-2xl overflow-hidden whitespace-nowrap text-ellipsis'>
                                    {showAlbums()}
                                </div>
                            </div>
                        </TagsPopover>

                    </div>
                    <div className='justify-end items-center flex flex-row gap-6'>
                        <button
                            className='h-10 flex justify-center items-center text-1xl bg-amber-950  text-red-500 font-medium px-2 rounded-md hover:opacity-70 focus:opacity-50'>
                            Resetear
                        </button>

                        <button type='submit' className='h-10 gap-2 flex justify-center items-center text-1xl bg-blue-600 px-2 rounded-md hover:opacity-70 focus:opacity-50'>
                            <FontAwesomeIcon className='text-sm' icon={faFilter} /> Filtrar
                        </button>
                    </div>
                </div>
                {!isGoodForm ? <p className='text-1xl text-red-500'>El inicio no puede ser mayor al final</p> : ""}
            </form>

        </div>
    )
}

export default FilterImagesDate