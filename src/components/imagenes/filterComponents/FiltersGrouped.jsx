import { useEffect, useState } from 'react';
import { useAuth } from '../../../AuthProvider';
import TagsPopover from './TagsPopover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import TagsSelection from './TagsSelection';
import RangesOptions from './RangesOptions';
import ProjectsSelection from './ProjectsSelection';
import LocationSelection from './LocationsSelection';
import AlbumSelection from './AlbumSelection'

export const FilterGrouped = () => {
    const [isGoodForm, setIsGoodForm] = useState(true)
    const [dateRange, setDateRange] = useState({ initDate: '', endDate: '' });
    const { ranges, groupedTags, projectsToFilter, locationToFilter, setLocationToFilter, albumsToFilter } = useAuth()
    const getDaysInMonth = (month, year) => {
        // `month` es de 1 a 12, por lo que restamos 1 para ajustarlo al índice (0 a 11)
        return new Date(year, month, 0).getDate();
    }



    useEffect(() => {
    }, [ranges, groupedTags, projectsToFilter, locationToFilter, albumsToFilter])
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

    return (
        <>
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



            {!isGoodForm ? <p className='col-span-4 text-1xl text-red-500'>El inicio no puede ser mayor al final</p> : ""}
        </>
    )
}

export default FilterGrouped