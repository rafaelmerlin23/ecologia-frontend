import React, { useEffect, useState } from 'react';
import handleGetData from '../../../helpers/handleGetData';
import { useAuth } from '../../../AuthProvider';

function AlbumSelection() {

    const [searchString, setSearchString] = useState('');
    const { locationToFilter, userData, albumsToFilter, setAlbumsToFilter } = useAuth();

    const token = userData.token;

    // Obtener proyectos al cargar el componente
    useEffect(() => {

        const getProjects = async () => {
            let newAlbumInformation = {}
            // const endpoint = `projects/show_albums?location_id=${}`
            const selectedLocations = []

            Object.entries(locationToFilter).forEach(([project, locations]) => {
                locations.forEach(location => {
                    if (location.isSelected) {
                        selectedLocations.push(location)
                    }
                })
            })

            for (let i = 0; i < selectedLocations.length; i++) {
                const endpoint = `projects/show_albums?location_id=${selectedLocations[i].index}`

                const data = await handleGetData(endpoint, token)
                const albums = data.response.map(album => ({
                    isSelected: false,
                    index: album[0],
                    name: album[2],
                }))
                newAlbumInformation[selectedLocations[i].name] = albums
            }

            setAlbumsToFilter(newAlbumInformation)

        };
        getProjects();
    }, [locationToFilter]);

    return (
        <div className='w-[310px] p-4 max-h-[20rem] overflow-y-auto bg-zinc-700 rounded-md'>

            <input
                type="text"
                placeholder="Buscar puntos..."
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                className="w-full mb-4 p-2 rounded-md text-sm bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {Object.entries(albumsToFilter).map(([location, albums]) => (
                <div key={location} className="mb-4">
                    <h3 className="text-green-500 font-bold">{albums.filter(album => album.name.toLowerCase().includes(searchString.toLowerCase())).length > 0 && albums.length > 0 ? location : ""}</h3>
                    <div className="flex flex-col gap-2 mt-2">
                        {albums
                            .filter(album => album.name.toLowerCase().includes(searchString.toLowerCase())) // Filtrar por búsqueda
                            .map(album => (
                                <button
                                    type='button'
                                    key={album.index}
                                    className={`overflow-hidden whitespace-nowrap text-ellipsis px-2  hover:brightness-200 hover:bg-transparent hover:border-4 hover:border-green-700 hover:text-green-500 text-sm  flex  
                                        ${album.isSelected
                                            ? 'brightness-200 bg-transparent border-4 border-green-800 text-green-900'
                                            : ' border-4 border-zinc-800 bg-zinc-800'}`}
                                    onClick={() => {
                                        // Cambiar estado de selección
                                        const updateAlbums = { ...albumsToFilter };
                                        const albumIndex = updateAlbums[location].findIndex(a => a.index === album.index);
                                        updateAlbums[location][albumIndex].isSelected = !album.isSelected;
                                        setAlbumsToFilter(updateAlbums);
                                    }}
                                >
                                    {album.name}
                                </button>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AlbumSelection;
