import { useAuth } from "../AuthProvider"
import FormularioPuntos from "../forms/FormularioPuntos"

export const CrearPunto = ({ closeCreateLocation, isActive }) => {
    if (!isActive) return null
    const { userData, projectInformation } = useAuth()
    const token = userData.token

    const handleCreateLocation = (e, name, longitude, latitude) => {
        e.preventDefault()
        const coordinates = `${latitude}, ${longitude}`
        const formData = new FormData();
        formData.append('location_name', name);
        formData.append('location_coordinates', coordinates);
        formData.append('project_id', projectInformation.index);


        // Hacer la petición POST
        fetch('http://127.0.0.1:5000/api/pictures/create_location', {
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