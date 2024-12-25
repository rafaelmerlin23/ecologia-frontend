import { useAuth } from "../AuthProvider"
import FormularioPuntos from "../forms/FormularioPuntos"
import prefixUrl from "../helpers/ip"
import { useProjectStruct } from "./providers/StructProjectProvider"
export const CrearPunto = ({ closeCreateLocation, isActive }) => {
    if (!isActive) return null
    const { refreshProjects, userData } = useAuth()
    const { projectInformation } = useProjectStruct()

    const token = userData.token

    const handleCreateLocation = (e, name, longitude, latitude) => {
        e.preventDefault()
        const coordinates = `${latitude}, ${longitude}`
        const formData = new FormData();
        formData.append('location_name', name);
        formData.append('location_coordinates', coordinates);
        formData.append('project_id', projectInformation.index);


        // Hacer la petición POST
        fetch(`${prefixUrl}projects/create_location`, {
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
                    closeCreateLocation()
                    refreshProjects()

                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    return (
        <FormularioPuntos closeLocationForm={closeCreateLocation} message={"Crear"} handle={handleCreateLocation}  >

        </FormularioPuntos>
    )
}

export default CrearPunto