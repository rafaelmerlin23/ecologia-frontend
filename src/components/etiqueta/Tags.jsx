import { useEffect, useState } from "react";
import handleGetData from "../../helpers/handleGetData";
import { useAuth } from "../../AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faCheck, faEdit, faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import handleCreate from "../../helpers/handleCreate";
import prefixUrl from "../../helpers/ip";

export const Tags = ({categoryId}) => {
    const {userData} = useAuth();
    const token = userData.token;
    const[tags,setTags] = useState([]);
    const [isCreateActive,setIsCreateActive] = useState(false);
    const [newTag,setNewTag] = useState('');

    useEffect(()=>{
        const getData =async ()=>{
            const endPoint =`tag_system/show_tags?category_id=${categoryId}`;
            const tagsResponse = await handleGetData(endPoint,token);
            
            let newTags = tagsResponse.response.map((tag)=>({
                    id: tag?.[0],
                    name:tag?.[1],
                    originalName:tag?.[1],
                    categoryId:tag?.[2],
                    used:0
                }));

                if (newTags.length > 0) {
                    // Esperamos a que todas las promesas se resuelvan usando Promise.all
                    const newTagsWithUsed = await Promise.all(
                        newTags.map(async (tag) => {
                            const endPoint = `tag_system/tag_statistics?tag_id=${tag.id}`;
                            const response = await handleGetData(endPoint, token);
                            return {
                                ...tag,
                                used: response.message // O el valor que necesitas
                            };
                        })
                    );
                    setTags(newTagsWithUsed); // Establecemos el estado con los datos resueltos
                } else {
                    setTags(newTags);
                }
            
        }
        getData();
        tags.length>0 && console.log("tags tags",tags);
    },[])

    const onCreateTag=()=>{
        const url = `${prefixUrl}tag_system/create_tag`;
        const form = new FormData();
        form.append('category_id',categoryId);
        form.append('tag_name',newTag);

        handleCreate(url,token,form,(data)=>{
            setTags(tags=>([...tags,
                {
                    id:data?.category_id,
                    name:data?.tag_name,
                    originalName:data?.tag_name,
                    categoryId:categoryId,
                    used:0
                }
            ]))
            setIsCreateActive(false)
        });

    }

    return(
        <div className="flex justify-center items-center">
            <div className="w-[40vw] ">
            <div className="flex justify-center mb-10 ">
                <button
                    onClick={()=>setIsCreateActive(prev=>!prev)}
                    disabled = {isCreateActive}
                    className="disabled:opacity-50"
                >
                    <FontAwesomeIcon className="bg-green-700 p-1 rounded-md w-[5vw]" icon={faPlus} />
                </button>
            </div>
            {isCreateActive &&
            <div className="mb-10 flex flex-row">
                <input 
                value={newTag}
                
                onChange={e=> setNewTag(e.target.value)}
                className="bg-zinc-700 w-full pr-10"/>
                <div 
                className="flex gap-10 pl-auto bg-zinc-800 px-4 py-1">
                    <button
                    onClick={()=>setIsCreateActive(false)}
                    >
                        <FontAwesomeIcon icon={faCancel}/>
                    </button>
                    <button
                    onClick={onCreateTag}
                    >
                        <FontAwesomeIcon icon={faCheck}/>
                    </button>
                </div> 
            </div>
            }
            {tags.length > 0 && tags.map((tag, index) => (
                <>
                    <div className="mb-4 flex flex-row gap-2 items-center" key={index}>
                        <label 
                            className="w-[15vw]  overflow-hidden text-ellipsis" // Max-width and text ellipsis
                        >
                            {tag.name}
                        </label>
                        <label 
                            className="ml-[4vw] bg-transparent border border-gray-400 px-4 rounded-md max-w-xs overflow-hidden text-ellipsis text-center" // Apply max width and text ellipsis
                        >
                            {tag.used}
                        </label>
                        <div 
                        className="flex gap-10 ml-auto">
                            <button>
                                <FontAwesomeIcon icon={faPen}/>
                            </button>
                            <button>
                                <FontAwesomeIcon icon={faTrash}/>
                            </button>
                        </div>
                    </div>
                    <hr  className="mb-6"/>
                </>

            ))}
         
            </div>
        </div>
    )
}

export default Tags;