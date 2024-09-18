import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faTag } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../AuthProvider";
import prefixUrl from "../helpers/ip";
import Overlay from "../components/Overlay";

export const CategoriaEtiqueta = () => {
    const page = 1
    const quantity = 20
    const { userData 
            ,shouldRefresh
            ,refreshProjects
            ,categoriesToDelete
            ,fields
            , setFields
            ,setCategoryToDelete} = useAuth()

    const [oldFields, setOldFiles] = useState([])
    const token = userData.token
    const [goingToDelete,setGoingToDelete] = useState(false)

    const handlecloseOverlay = () =>{
        setGoingToDelete(false)
    }

    const handleOpenOverayDelete = ()=>{
        setGoingToDelete(true)
    }

    // Maneja el cambio en los campos de entrada
    const handleFieldChange = (index, e) => {
        const { name, value } = e.target;
        const newFields = [...fields];
        newFields[index] = { ...newFields[index], [name]: value };
        setFields(newFields);
    };

    const handleDelete = (e,field)=> {
        e.preventDefault()
        if(field.id == 0){
            let newfields = []
            for (let fieldFor of fields) {
            if (fieldFor != field) {
                newfields.push(fieldFor)
                console.log(fieldFor)
            }
            }
            setFields(newfields)
        }
        else{
            setCategoryToDelete(field)
            handleOpenOverayDelete()
            
        }
    }


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
        <div className="bg-gray-950 mx-auto min-h-screen  w-full flex justify-center">
        <ModalDelete isActive={goingToDelete} handleClose={handlecloseOverlay} />    
            <div className="flex flex-col  w-1/2 ">
                <form onSubmit={handleSubmit} className="mt-24">
                    {fields.map((field, index) => (
                        <div key={index} className="bg-blue-600 mb-4 flex flex-row gap-4 m-0 p-0 justify-center items-center">
                            <input
                                type="text"
                                name="field"
                                value={field.field}
                                onChange={(e) => handleFieldChange(index, e)}
                                placeholder="rojo"
                                className="text-black p-1 w-full"
                                required
                                minLength={5}
                            />
                            <div className="m-0 p-0 flex gap-6 pr-4 ">
                                <button 
                                onClick={(e)=>handleDelete(e,field)}
                                className="bg-red-500 rounded-full px-2">
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
                            className="mb-10 px-4 py-2 text-black bg-green-500 rounded-md hover:bg-green-400"
                            type="submit"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
                
            </div>
            <button 
            id="ad-bottom"
            onClick={addField} 
            className="fixed bottom-5 right-20 w-auto z-[100] text-gray-700 bg-blue-400 rounded-full mt-4 mb-10 px-4 py-2">
             <FontAwesomeIcon icon={faPlus} />
            </button>

        </div>
    )

}

const ModalDelete =({isActive,handleClose}) =>{
    if(!isActive) return null
    const { setCategoriesToDelete,setFields,fields,categoryToDelete} = useAuth()
    
    const handleDelete = ()=>{
        setCategoriesToDelete((categoriesToDelete)=>[...categoriesToDelete,categoriesToDelete])
        let newfields = []
        for (let field of fields) {
            if (field != categoryToDelete) {
                newfields.push(field)
            }
        }
        setFields(newfields)
        handleClose()
    }
    
    return(
        <Overlay animacion={handleClose} > 
            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            <p className='text-2xl font-bold flex items-center justify-center'>¿Deseas eliminar esta categoria?</p>
            <div>
            <button onClick={handleDelete} className='py-2 px-6 text-white bg-red-800 hover:opacity-70 rounded-2xl m-1 border-1 border-red-600'>Eliminar</button>
            <button className='py-2 px-6 text-gray-400 bg-gray-800 hover:opacity-70 rounded-2xl m-1 border-1 border-gray-200  mt-0' onClick={handleClose}>cancelar</button>
            </div>
        </Overlay>
    )
   
}

export default CategoriaEtiqueta



