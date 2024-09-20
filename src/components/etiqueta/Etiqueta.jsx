import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faX } from "@fortawesome/free-solid-svg-icons"
import AgregarEtiqueta from './AgregarEtiqueta'
import { useAuth } from '../../AuthProvider'
import prefixUrl from '../../helpers/ip'

function Etiqueta({categoryId}) {

    const [tags,setTags] = useState([])
    const {shouldRefresh,userData} = useAuth()
    const [isActiveTagOverlay,setIsActiveTagOverlay] = useState(false)
    const handleOpenTagOverlay = () => setIsActiveTagOverlay(true)
    const handleCloseTagOverlay = () => setIsActiveTagOverlay(false)
    const token = userData.token
    const page = 1
    const quantity = 100

    useEffect(() => {
        fetch(`${prefixUrl}pictures/show_tags?page=${page}&quantity=${quantity}`, {
            method: 'GET',
            headers: {
                'Authorization': token // Envía el token en el encabezado Authorization
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data && data.status == 'success') {
                    console.log(data.response)
                    const newTags = data.response.map((tag)=>({
                        name:tag[1],
                        idTag:tag[2]
                    }))
                    setTags(newTags)

                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [shouldRefresh])
    
    return (
    <div className='flex justify-center flex-col items-center border-x border-b border-gray-600  mt-0 mb-5 p-2'>
        <AgregarEtiqueta categoryId={categoryId} isActive={isActiveTagOverlay} handleClose={handleCloseTagOverlay}/>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 py-4'>
        {tags.map((tag) => (
        <div className='flex items-center justify-between bg-green-700 px-4 rounded-full'>
            <span className='flex-grow text-center text-white'>{tag.name.lenght <=20? tag.name : tag.name.slice(0,18)+".."}</span>
            <button className='text-gray-200'>
                <FontAwesomeIcon className='pl-2 text-sm' icon={faX} />
            </button>
        </div>
        ))}
        </div>
        <button className=''
        onClick={handleOpenTagOverlay}
        >
        <FontAwesomeIcon  
        className='bg-green-400 px-3 py-1 rounded-full text-gray-700'
        icon={faPlus}/>        
        </button>
    </div>
  )
}

export default Etiqueta