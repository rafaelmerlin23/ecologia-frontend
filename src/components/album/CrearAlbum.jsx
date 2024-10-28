import { useState } from 'react'
import FormularioAlbum from '../../forms/FormularioAlbum'
import prefixUrl from '../../helpers/ip'
import { useAuth } from '../../AuthProvider'

export function CrearAlbum({ isActive, closeCreateAlbum }) {
    if(!isActive) return null
    const [response, setResponse] = useState(null)
    const { locationInformation,userData, refreshProjects } = useAuth()
    const token = userData.token
    console.log(token)

    const handleCreateProject = (e, name, date) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('album_name', name);
        formData.append('album_date', date);
        formData.append('location_id', locationInformation.index);

        // Hacer la petición POST
        fetch(`${prefixUrl}projects/create_album`, {
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
                    closeCreateAlbum()

                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }
  
    return (
    <FormularioAlbum closeCreatAlbum={closeCreateAlbum} handle={handleCreateProject} message={"Crear"} >

    </FormularioAlbum>
  )
}

export default CrearAlbum
