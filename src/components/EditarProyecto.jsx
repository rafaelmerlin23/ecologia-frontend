import Overlay from './Overlay'
import '../App.css'
import FormularioProyecto from '../forms/FormularioProyecto'
import { useAuth } from '../AuthProvider'
import { useState } from 'react'

const EditarProyecto = ({ proyecto, cerrarEditar, isActive }) => {
    if (!isActive) return null

    const [response, setResponse] = useState(null)
    const { userData, refreshProjects } = useAuth()
    const token = userData.token

    const project = {
        index: proyecto.indice,
        name: proyecto.nombre,
        description: proyecto.description,
        date: proyecto.fecha
    }


    const handleUpdateProject = (e, name, description, date) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('project_id', project.index);
        formData.append('project_name', name);
        formData.append('project_description', description);
        formData.append('project_date', date);

        // Hacer la petición PATCH
        fetch('http://127.0.0.1:5000/api/pictures/update_project', {
            method: 'PATCH',

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
                    cerrarEditar()

                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    return (
        <FormularioProyecto closeCreateProject={cerrarEditar} handle={handleUpdateProject} message={"Actualizar"} project={project}>

        </FormularioProyecto>
    )

}




export default EditarProyecto