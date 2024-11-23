import React, { useEffect, useState} from 'react'
import handleGetData from '../../../helpers/handleGetData'
import { useAuth } from '../../../AuthProvider';
function TagsSelection() {
    
    const [tagsInfo,setTagsInfo] = useState([])
    const {setTagsFilters,userData} = useAuth()
    const token = userData.token
    
    
    const removeFilterTags = (tag) => {
        // Filtrar las etiquetas en tagsFilters
        setTagsFilters((prevTagsFilters) => 
            prevTagsFilters.filter((filterTag) => filterTag.tagID !== tag.tagID)
        );
    
        // Actualizar tagsInfo para reflejar el cambio
        const newTagsInfo = tagsInfo.map((category) => {
            if (category[0] === tag.categoryID) {
                return [
                    category[0],
                    category[1],
                    category[2].map( (tagEach) =>
                        tagEach.tagID === tag.tagID ? { ...tagEach, isSelected: false } : tagEach
                    ),
                ]
            }
            return category;
        })
    
        setTagsInfo(newTagsInfo);
    }
    

    const onClickTags = (indexCategory, indexTag) => {
        // Obtén la etiqueta seleccionada
        const tag = tagsInfo[indexCategory][2][indexTag];
    
        // Si la etiqueta ya está seleccionada, eliminarla del filtro
        if (tag.isSelected) {
            
            // Llamar a la función que elimina el filtro
            removeFilterTags(tag);
    
            // Aquí puedes actualizar el estado de tagsInfo para cambiar isSelected a false
            const newTagsInfo = [...tagsInfo];
            newTagsInfo[indexCategory][2][indexTag] = { ...tag, isSelected: false };
            setTagsInfo(newTagsInfo);
        } else {
            
            // Agregar la etiqueta a los filtros
            setTagsFilters(tagsFilter => [...tagsFilter, tag]);
    
            // Actualiza el estado de tagsInfo para cambiar isSelected a true
            const newTagsInfo = [...tagsInfo];
            newTagsInfo[indexCategory][2][indexTag] = { ...tag, isSelected: true };
            setTagsInfo(newTagsInfo);
        }
        
    };
    
    


    useEffect(()=>{
        const getData = async () =>{
            const endpointCategories = `tag_system/show_categories`
            const categories = await handleGetData(endpointCategories,token)
            const response = categories.response
            
            const newInformationTags = []

            for(let i = 0; i< response.length; i++){
                if(response[i][0] !== 1){
                    const endPointTags = `tag_system/show_tags?category_id=${response[i][0]}`
                    const tagsCategories = await handleGetData(endPointTags,token)
                    const responseTags = tagsCategories.response 
                    const newTags = responseTags.map((tag)=>(
                        {
                            tagID:tag[0],
                            tagName:tag[1],
                            categoryID:tag[2],
                            isSelected:false
                        }
                    ))
                    newInformationTags.push([response[i][1],response[i][0],newTags])    
                }
                
            }
            setTagsInfo(newInformationTags)
        }
        getData()
    },[])

    
    return (
        <div   className=' w-[310px] p-4   max-h-[20rem] overflow-y-auto bg-zinc-700 rounded-md '>
            
           <div className='font-bold flex gap-3 flex-col '>
            {
                tagsInfo.map((category,indexC)=>(
                    <div 
                    key={indexC}>
                        <p className=' mb-2'>{category[0]}</p>
                        <div className='flex gap-2 flex-col '>
                        {category[2].map((tag,indexT)=>(
                            <button 
                            onClick={e => onClickTags(indexC,indexT)}
                            className={` text-sm justify-center flex items-center ${tag.isSelected? 'brightness-200 bg-transparent border-4 border-green-800 text-green-900':' border-4 border-zinc-800 bg-zinc-800'}`}
                            key={indexT}>
                                {tag.tagName}
                            </button>
                        ))}
                        </div>
                    </div>
                ))
            }
            </div> 
        </div>
  )
}

export default TagsSelection