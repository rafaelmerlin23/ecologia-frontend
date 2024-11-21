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


    // name = 1 , id = 0 , categoryID = 2 isSelect = true
    const onClickTags =(tag)=>{

    }
    
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
                    newInformationTags.push([response[i][1],response[i][0],responseTags,false])    
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
                tagsInfo.map(category=>(
                    <div key={category[1]}>
                        {category[0]}
                        <div className='flex gap-2 flex-col'>
                        {category[2].map(tag=>(
                            <button 
                            onClick={onClickTags(tag)}
                            className={`text-sm justify-center flex items-center ${tag[3]? 'bg-green-800':'bg-zinc-800'}`}
                            key={tag[0]}>
                                {tag[1]}
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