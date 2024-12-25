import { useAuth } from "../../AuthProvider"
import FormularioAlbum from "../../forms/FormularioAlbum"
import prefixUrl from "../../helpers/ip"
import { useProjectStruct } from "../providers/StructProjectProvider"
export const EditarAlbum = ({ closeEdit, isActive }) => {
    const { userData, refreshProjects } = useAuth()
    const { locationInformation, albumInformation } = useProjectStruct()
    const token = userData.token


    const handleUpdateAlbum = (e, name, date, index) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('album_id', index);
        formData.append('album_name', name);
        formData.append('location_id', locationInformation.index);
        formData.append('album_date', date);

        // Hacer la petición PATCH
        fetch(`${prefixUrl}projects/update_album`, {
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
                    refreshProjects()
                    closeEdit()
                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    if (!isActive) return null

    return (
        <FormularioAlbum closeCreatAlbum={closeEdit} handle={handleUpdateAlbum} message={"Actualizar"} album={albumInformation} >

        </FormularioAlbum>
    )
}