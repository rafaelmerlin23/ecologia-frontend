import { useAuth } from "../../AuthProvider"
import FormularioPuntos from "../../forms/FormularioPuntos"
import prefixUrl from "../../helpers/ip"
import { useState } from "react"

const EditarPunto = ({closeEdit,isActive}) =>{
    if(!isActive) return null

    const [response,setResponse] = useState(null)
    const {userData,refreshProjects,locationInformation,projectInformation} = useAuth()
    const token = userData.token

    const handleUpdateLocation = (e,name,latitude,longitude,id)=>{
        e.preventDefault()
        const coordinates = `${latitude}, ${longitude}`
        const formData = new FormData();
        formData.append('location_id', id);
        formData.append('location_name', name);
        formData.append('location_coordinates', coordinates);
        formData.append('project_id', projectInformation.index);

        // Hacer la petición PATCH
        fetch(`${prefixUrl}pictures/update_location`, {
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
                    closeEdit()
                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return(
        <FormularioPuntos closeLocationForm={closeEdit} handle={handleUpdateLocation} message={"Actualizar"} location={locationInformation} >

        </FormularioPuntos>
    )
}

export default EditarPunto