import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faX, faArrowDown } from "@fortawesome/free-solid-svg-icons"
import AgregarEtiqueta from './AgregarEtiqueta'
import { useAuth } from '../../AuthProvider'
import prefixUrl from '../../helpers/ip'
import Overlay from '../Overlay'
import { handleDelete } from '../../helpers/handleDelete'

function Etiqueta({ category }) {


    const { shouldRefresh, userData, setIsModalCategoryDeleteActive, isModalCategoryDeleteActive } = useAuth()
    const [isActiveTagOverlay, setIsActiveTagOverlay] = useState(false)
    const [tags, setTags] = useState([])
    const [isDeleteTagOverlayActive, setIsDeleteTagOverlayActive] = useState(false)
    const [tagToDelete, setTagToDelete] = useState(null)
    const handleOpenDeleteOverlay = (tagId) => {
        setIsDeleteTagOverlayActive(true)
        setTagToDelete(tagId)
    }
    const handleCloseDeleteOverlay = () => {
        setIsDeleteTagOverlayActive(false)
        setTagToDelete(null)
    }

    const handleOpenTagOverlay = () => {
        setIsModalCategoryDeleteActive(false)
        console.log(isModalCategoryDeleteActive)
        setIsActiveTagOverlay(true)
    }
    const handleCloseTagOverlay = () => {
        console.log(isModalCategoryDeleteActive)
        setIsActiveTagOverlay(false)

    }
    const token = userData.token
    const page = 1
    const quantity = 100

    useEffect(() => {
        if (category.id === 0) {
            setTags([])
            return
        }
        fetch(`${prefixUrl}pictures/show_tags?page=${page}&quantity=${quantity}&category_id=${category.id}`, {
            method: 'GET',
            headers: {
                'Authorization': token // Envía el token en el encabezado Authorization
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data && data.status === 'success') {
                    console.log(data.response);
                    const newTags = data.response.map((tag) => ({
                        name: tag[1], // El nombre de la etiqueta está en el índice 1
                        idTag: tag[0] // El tag_id está en el índice 0
                    }));
                    setTags(newTags);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [shouldRefresh]);


    return (
        <div className=' flex justify-center  items-center border-x border-b border-gray-600  mt-0 mb-5 p-2'>
            <AgregarEtiqueta setTags={setTags} categoryId={category.id} isActive={isActiveTagOverlay} handleClose={handleCloseTagOverlay} />
            <DeleteTagModal handleClose={handleCloseDeleteOverlay} isActive={isDeleteTagOverlayActive} tagId={tagToDelete} />

            {category.id != 0 ? <div className='flex justify-center items-center flex-col '>
                {tags.length !== 0 ? <div className='px-0 grid  lg:grid-cols-2 xl:grid-cols-3 gap-3 py-4'>
                    {tags.map((tag, index) => (
                        <div key={index} className='flex items-center justify-between bg-green-700 px-4 rounded-full'>
                            <span className='flex-grow text-center text-white'>
                                {!(tag.name.length <= 20) ? tag.name.slice(0, 18) + ".." : tag.name}
                            </span>
                            <button
                                onClick={() => handleOpenDeleteOverlay(tag.idTag)}
                                className='text-gray-200'>
                                <FontAwesomeIcon className='pl-2 text-sm' icon={faX} />
                            </button>
                        </div>
                    ))}
                </div>
                    : <div className='flex justify-center items-center flex-col'>
                        <p className='p-3 m-0 pb-0'>Esta categoría no tiene etiquetas, agrega una.</p>
                        <FontAwesomeIcon className='pb-1 text-green-600' icon={faArrowDown} />
                    </div>
                }
                <button className=''
                    onClick={handleOpenTagOverlay}
                >
                    <FontAwesomeIcon
                        className='bg-green-400 px-3 py-1 rounded-full text-gray-700'
                        icon={faPlus} />
                </button>
            </div> : <p className='text-red-600'>presiona <span className='text-green-400'>[guardar]</span> para poder agregar etiquetas</p>}
        </div>
    )
}

const DeleteTagModal = ({ isActive, handleClose, tagId }) => {
    if (!isActive) return null
    const { refreshProjects, userData } = useAuth()
    const token = userData.token

    const handleDeleteTag = () => {
        const formData = new FormData();
        formData.append('tag_id', tagId);
        const endPoint = 'pictures/delete_tag'
        handleDelete(endPoint, formData, token, () => {
            refreshProjects()
        })
        handleClose()
    }

    return (
        <Overlay animacion={handleClose}>
            <label className="block mb-2 text-1xl font-medium text-gray-900 dark:text-white">Eliminar etiqueta.</label>
            <div className='flex justify-center items-center flex-row gap-2'>
                <button
                    onClick={handleDeleteTag}
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1 text-center"
                >
                    Eliminar
                </button>
                <button
                    onClick={handleClose}
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1    text-center "
                >
                    Cancelar
                </button>
            </div>
        </Overlay>
    )

}

export default Etiqueta