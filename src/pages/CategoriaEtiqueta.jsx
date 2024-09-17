import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faTag } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../AuthProvider";
import prefixUrl from "../helpers/ip";

export const CategoriaEtiqueta = () => {
    const page = 1
    const quantity = 20
    const [fields, setFields] = useState([]);
    const { userData, shouldRefresh, refreshProjects } = useAuth()
    const [oldFields, setOldFiles] = useState([])
    const token = userData.token

    // Maneja el cambio en los campos de entrada
    const handleFieldChange = (index, e) => {
        const { name, value } = e.target;
        const newFields = [...fields];
        newFields[index] = { ...newFields[index], [name]: value };
        setFields(newFields);
    };

    const handleCreateCategory = (field) => {
        const formData = new FormData();
        formData.append('category_name', field.field);

        // Hacer la petición POST
        fetch(`${prefixUrl}pictures/create_category`, {
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
                    console.log(data.response)
                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    const handleUpdateCategory = (field) => {
        const formData = new FormData();
        formData.append('category_name', field.field);
        formData.append('category_id', field.id);

        // Hacer la petición PATCH
        fetch(`${prefixUrl}pictures/update_category`, {
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
                    console.log(data.response)
                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    // Añade un nuevo conjunto de campos
    const addField = () => {
        setFields([...fields, { field: '', id: 0 }]);
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {

        e.preventDefault();

        for (let field of fields) {
            if (field.id === 0) {
                handleCreateCategory(field)
            } else {
                for (let i = 0; i < oldFields.length; i++) {
                    if (oldFields[i].field !== fields[i].field) {
                        handleUpdateCategory(fields[i])
                    }
                }
            }
        }
        refreshProjects()
        // Procesar los datos aquí
        console.log(fields);
    };

    useEffect(() => {
        document.body.className = ' bg-gradient-to-r from-gray-900 to-blue-gray-950';
        setFields([])
        fetch(`${prefixUrl}pictures/show_categories?page=${page}&quantity=${quantity}`, {
            method: 'GET',
            headers: {
                'Authorization': token // Envía el token en el encabezado Authorization
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Respuesta del servidor:', data);
                if (data && data.status == 'success') {
                    const newFields = data.response.map(category => ({ field: category[1], id: category[0] }));
                    setOldFiles(newFields);
                    setFields(newFields);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        return () => {
            document.body.className = 'bg-black';
        };
    }, [shouldRefresh])




    return (
        <div className="mx-auto border-x  w-3/5 flex justify-center">
            <div className="flex flex-col w-1/2 ">
                <form onSubmit={handleSubmit} className="mt-24">
                    {fields.map((field, index) => (
                        <div key={index} className="mb-4 flex flex-col gap-4 m-0 p-0 justify-center items-center">
                            <input
                                type="text"
                                name="field"
                                value={field.field}
                                onChange={(e) => handleFieldChange(index, e)}
                                placeholder="nombre"
                                className="text-black p-1 w-full"
                                required
                                minLength={5}
                            />
                            <div className="m-0 p-0 flex gap-6">
                                <button className="bg-red-500 rounded-full px-2">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>

                                <button className="bg-gray-500 rounded-full px-2">
                                    <FontAwesomeIcon icon={faTag} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {/* Contenedor para centrar el botón */}
                    <div className="flex justify-center mt-4">
                        <button
                            className="px-2 text-black bg-green-500 rounded-full hover:bg-green-400"
                            type="submit"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
                <button onClick={addField} className="text-gray-700 bg-blue-400 rounded-full mt-4">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>
    )

}

export default CategoriaEtiqueta



