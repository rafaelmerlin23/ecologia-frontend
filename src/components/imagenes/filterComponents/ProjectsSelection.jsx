import { useEffect, useState } from "react";
import { handleGetData } from "../../../helpers/handleGetData";
import { useAuth } from "../../../AuthProvider";

export const ProjectsSelection = () => {
    const { userData, projectsToFilter, SetProjectToFilter, setLocationToFilter } = useAuth();
    const [searchText, setSearchText] = useState("");
    const [filteredProjects, setFilteredProjects] = useState([]);
    const token = userData.token;

    const onSelect = (index) => {
        let newProjectsToFilter = [...projectsToFilter];
        newProjectsToFilter[index].isSelected = !newProjectsToFilter[index].isSelected;
        SetProjectToFilter(newProjectsToFilter);
    };

    // Obtener proyectos al cargar el componente
    useEffect(() => {
        setLocationToFilter({})
        const getProjects = async () => {
            if (projectsToFilter.length > 0) return;
            const endpointProjects = "projects/show_projects";
            const data = await handleGetData(endpointProjects, token);
            const newProjects = data.response.map((project) => ({
                index: project[0],
                date: project[3].slice(4, 17),
                name: project[1],
                description: project[2],
                isSelected: false,
            }));
            SetProjectToFilter(newProjects);
        };
        getProjects();
    }, []);

    // Actualizar proyectos filtrados cuando cambia el texto de búsqueda o los proyectos disponibles
    useEffect(() => {
        if (!searchText) {
            setFilteredProjects(projectsToFilter); // Mostrar todos si no hay búsqueda
        } else {
            const filtered = projectsToFilter.filter((project) =>
                project.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredProjects(filtered);
        }
    }, [searchText, projectsToFilter]);

    return (
        <div className="w-[310px] p-4 max-h-[20rem] overflow-y-auto bg-zinc-700 rounded-md">
            {/* Barra de búsqueda */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar proyectos..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full p-2 rounded-md text-sm bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            {/* Lista de proyectos */}
            <div className="font-bold flex gap-3 flex-col">
                {filteredProjects.map((project, index) => (
                    <button
                        onClick={() => onSelect(index)}
                        className={`overflow-hidden whitespace-nowrap text-ellipsis px-2  hover:brightness-200 hover:bg-transparent hover:border-4 hover:border-green-700 hover:text-green-500 disabled:opacity-40 text-sm  flex  ${project.isSelected
                            ? "brightness-200 bg-transparent border-4 border-green-800 text-green-900"
                            : "border-4 border-zinc-800 bg-zinc-800"
                            }`}
                        key={index}
                    >
                        {project.name}
                    </button>
                ))}
                {filteredProjects.length === 0 && (
                    <p className="text-sm text-gray-400 text-center">No se encontraron proyectos</p>
                )}
            </div>
        </div>
    );
};

export default ProjectsSelection;
