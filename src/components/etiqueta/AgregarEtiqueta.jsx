import React, { useState } from 'react'
import Overlay from '../Overlay'
import prefixUrl from '../../helpers/ip'
import { useAuth } from '../../AuthProvider'
function AgregarEtiqueta({ isActive, handleClose, categoryId, setTags }) {
    if (!isActive) return null

    const [name, setName] = useState('')
    const { userData, setIsModalCategoryDeleteActive } = useAuth()
    const token = userData.token


    const handleCreateTag = (e) => {
        e.preventDefault()

        if (name.length <= 3 || !name) {
            return
        }


        const formData = new FormData();
        formData.append('tag_name', name);
        formData.append('category_id', categoryId);

        // Hacer la petición POST
        fetch(`${prefixUrl}pictures/create_tag`, {
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
                    console.log("se hizo");
                    handleClose();
                    setIsModalCategoryDeleteActive(true);
                    setTags((tags) => [...tags, { name: name, idTag: 0 }]);

                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    return (
        <Overlay animacion={handleClose}>
            <div className='p-4 '>
                <label className="block mb-2 text-1xl font-medium text-gray-900 dark:text-white">Agregar etiqueta.</label>
                <div className="mb-5">
                    <label className=" block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre:</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}

                        type="text"
                        id="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Coatza 1" />
                </div>
                <button
                    onClick={(e) => handleCreateTag(e)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Crear
                </button>
            </div>

        </Overlay>
    )
}

export default AgregarEtiqueta