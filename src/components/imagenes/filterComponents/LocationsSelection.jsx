import React, { useEffect, useState } from 'react';
import handleGetData from '../../../helpers/handleGetData';
import { useAuth } from '../../../AuthProvider';

function TagsSelection() {

    const [searchString, setSearchString] = useState('');
    const { locationToFilter, setLocationToFilter, userData, projectsToFilter, setAlbumsToFilter } = useAuth();

    const token = userData.token;

    // Obtener proyectos al cargar el componente
    useEffect(() => {
        setAlbumsToFilter({})
        const getProjects = async () => {
            let newLocationInformation = {}
            for (let i = 0; i < projectsToFilter.length; i++) {
                const endpoint = `projects/show_locations?project_id=${projectsToFilter[i].index}`
                if (projectsToFilter[i].isSelected) {

                    const location = await handleGetData(endpoint, token)
                    const locations = location.response.map(((location) => (
                        {
                            name: location[1],
                            index: location[0],
                            isSelected: false,
                            projectName: projectsToFilter[i].name
                        }
                    )))
                    newLocationInformation[projectsToFilter[i].name] = locations
                }
            }
            setLocationToFilter(newLocationInformation)
            console.log(newLocationInformation)

        };
        getProjects();
    }, [projectsToFilter]);

    return (
        <div className='w-[310px] p-4 max-h-[20rem] overflow-y-auto bg-zinc-700 rounded-md'>

            <input
                type="text"
                placeholder="Buscar puntos..."
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                className="w-full mb-4 p-2 rounded-md text-sm bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {Object.entries(locationToFilter).map(([project, locations]) => (
                <div key={project} className="mb-4">
                    <h3 className="text-green-500 font-bold">{locations.filter(location => location.name.toLowerCase().includes(searchString.toLowerCase())).length > 0 && locations.length > 0 ? project : ""}</h3>
                    <div className="flex flex-col gap-2 mt-2">
                        {locations
                            .filter(location => location.name.toLowerCase().includes(searchString.toLowerCase())) // Filtrar por búsqueda
                            .map(location => (
                                <button
                                    type="button"
                                    key={location.index}
                                    className={`overflow-hidden whitespace-nowrap text-ellipsis px-2  hover:brightness-200 hover:bg-transparent hover:border-4 hover:border-green-700 hover:text-green-500 text-sm  flex  
                                        ${location.isSelected
                                            ? 'brightness-200 bg-transparent border-4 border-green-800 text-green-900'
                                            : ' border-4 border-zinc-800 bg-zinc-800'}`}
                                    onClick={() => {
                                        // Cambiar estado de selección
                                        const updatedLocations = { ...locationToFilter };
                                        const locationIndex = updatedLocations[project].findIndex(l => l.index === location.index);
                                        updatedLocations[project][locationIndex].isSelected = !location.isSelected;
                                        setLocationToFilter(updatedLocations);
                                    }}
                                >
                                    {location.name}
                                </button>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TagsSelection;
