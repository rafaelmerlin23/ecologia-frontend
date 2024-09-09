import { useState } from 'react'
import { useAuth } from '../AuthProvider'
import FormularioProyecto from '../forms/FormularioProyecto'

export const CrearProyecto = ({ isActive, closeCreateProject }) => {

    if (!isActive) return null

    const [response, setResponse] = useState(null)
    const { userData, refreshProjects } = useAuth()
    const token = userData.token
    console.log(token)

    const handleCreateProject = (e, name, description, date) => {
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
        <FormularioProyecto closeCreateProject={closeCreateProject} handle={handleCreateProject} message={"Crear"} >

        </FormularioProyecto>
    )
}

export default CrearProyecto