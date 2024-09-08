import { useState } from 'react'
import Overlay from './Overlay'
import { useAuth } from '../AuthProvider'

export const CrearProyecto = ({ isActive, closeCreateProject }) => {

    if (!isActive) return null
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [date, setDate] = useState()
    const [response, setResponse] = useState(null)
    const { userData, refreshProjects } = useAuth()
    const token = userData.token
    console.log(token)

    const handleCreateProject = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('project_name', name);
        formData.append('project_description', description);
        formData.append('project_date', date);

        // Hacer la petición POST
        fetch('http://127.0.0.1:5000/api/pictures/create_project', {
            method: 'POST',

            headers: {
                'Authorization': token // Envía el token en el encabezado Authorization
            },
            body: formData // Enviamos el FormData


        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Respuesta del servidor:', data);
                if (data && data.status == 'success') {
                    setResponse(data)
                    refreshProjects()
                    closeCreateProject()

                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    return (
        <Overlay animacion={closeCreateProject}>
            <form onSubmit={handleCreateProject} className=" p-5 xl:w-80 lg:w-80 md:w-80 ">
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                    <input onChange={(e) => setName(e.target.value)} maxLength={50} minLength={5} type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Coatza 1" required />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripcion</label>
                    <textarea onChange={(e) => setDescription(e.target.value)} maxLength={100} minLength={10} type="text" id="password" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder='coatza 1 proyecto' />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha</label>
                    <input onChange={(e) => {
                        console.log(date)
                        setDate(e.target.value)
                    }} type="date" id="date" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Crear</button>
            </form>
        </Overlay>
    )
}

export default CrearProyecto