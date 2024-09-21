import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faTag } from "@fortawesome/free-solid-svg-icons"
import Etiqueta from './Etiqueta'
function Categorias({index,field,handleFieldChange,handleDelete}) {
        
    const [isActiveTagMenu,setIsActveTagMenu] = useState(false)
    
    const handleShowTagMenu = (e)=> {
        e.preventDefault()
        if(field.id ===0){
            setIsActveTagMenu((isActiveTagMenu)=>!isActiveTagMenu)
        }else{
            setIsActveTagMenu((isActiveTagMenu)=>!isActiveTagMenu)
        }
    }


    return (
    <div className='flex-col '>
    <div key={index} className=" bg-gray-700 mb-0 flex md:flex-row sm:flex-row xl:flex-row gap-4  justify-center items-center">
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

        <div className=" flex gap-6 pr-4 ">
            <button 
            onClick={(e)=>handleDelete(e,field)}
            
            className="bg-red-500 rounded-full px-2">
                <FontAwesomeIcon icon={faTrash} />
            </button>

            <button
            className="bg-gray-500 rounded-full px-2"
            onClick={(e)=> handleShowTagMenu(e)}
            >
                <FontAwesomeIcon icon={faTag} />
            </button>
        </div>
        
    </div >
        {isActiveTagMenu?
        <Etiqueta category = {field} />
        :
        <div className='mb-4'>

        </div>
        }
    </div>
  )
}

export default Categorias