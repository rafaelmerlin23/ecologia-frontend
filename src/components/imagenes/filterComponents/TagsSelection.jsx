import React, { useEffect, useState} from 'react'
import FilterWrapper from './FilterWrapper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import handleGetData from '../../../helpers/handleGetData'
import { useAuth } from '../../../AuthProvider';
function TagsSelection({modalRef,buttonRef,setModalActive,modalActive,position}) {
    
    const [tagsInfo,setTagsInfo] = useState([])
    const {setTagsFilters,userData} = useAuth()
    const token = userData.token
    
    const handleClickOutside = (event) => {
        if (

            modalRef.current &&
            !modalRef.current.contains(event.target) &&
            buttonRef.current !== event.target
        ) {
            setModalActive(false);
        }
    };


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
                    category[2].map((tagEach) =>
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
    
    
    useEffect(() => {
        if (modalActive) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        // Cleanup en caso de que el modal cambie rápido
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalActive]);


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
    <FilterWrapper isActive={modalActive} modalRef={modalRef} position={position}>
        <div className='p-4 hidden xl:block max-h-[20rem] overflow-y-auto bg-zinc-700 rounded-md '>
            <div className='mb-2 bg-zinc-600 rounded-md gap-2 flex justify-center items-center px-2 py-1'>
                <FontAwesomeIcon icon={faSearch}/>
                <input type='text' className=" bg-zinc-700" />
                <button 
                className='flex justify-center items-center text-1xl bg-amber-950  text-red-500 font-medium px-2 rounded-md hover:opacity-70 focus:opacity-50'>Reset</button>
            </div>
           <div className='flex gap-3 flex-col'>
            {
                tagsInfo.map((category,indexC)=>(
                    <div key={indexC}>
                        {category[0]}
                        <div className='flex gap-2 flex-col'>
                        {category[2].map((tag,indexT)=>(
                            <button 
                            onClick={e => onClickTags(indexC,indexT)}
                            className={`text-sm justify-center flex items-center ${tag.isSelected? 'bg-green-800':'bg-zinc-800'}`}
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
    </FilterWrapper>
  )
}

export default TagsSelection