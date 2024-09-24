import { useAuth } from "../../AuthProvider"
import { useEffect, useState } from "react";
import prefixUrl from "../../helpers/ip";
import ModalIMagen from "./ModalIMagen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";

export const Etiquetador = () => {
    const navigate = useNavigate()
    const { image, userData, userName } = useAuth()
    const [raiting, setRaiting] = useState(1.0)
    const token = userData.token
    const [categories, setCategories] = useState([])
    const [tags,setTags] = useState([])
    const [isModalActive,setIsModalActive] = useState(false)
    const [tagsSelected,setTagsSelected] = useState([])

    const handleClick = () => {
        // Aquí puedes realizar alguna lógica antes de redirigir
        navigate('../categoria-etiqueta');
      };

    const handleSelect = (e,tag) =>{
        e.preventDefault()
        setTagsSelected(tagsSelected=>[...tagsSelected,tag.idTag])
        let newTags = []
        tags.forEach((tagEach)=>{
            if(tagEach === tag){
                newTags.push({
                    name: tagEach.name, // El nombre de la etiqueta está en el índice 1
                    idTag: tagEach.idTag,
                    isSelect:!tagEach.isSelect
                })
            }else{
                newTags.push(tagEach)
            }
        })
        setTags(newTags)
        const newTagsSelected = []
        newTags.forEach((newTag)=>{
            if(newTag.isSelect){
                newTagsSelected.push(newTag.idTag)
            }
        })
        setTagsSelected(newTagsSelected)
        console.log(newTagsSelected)
    }

    const handleCloseModal = () =>{
        setIsModalActive(false)
    }

    const handleOpenModal = () =>{
        setIsModalActive(true)
    }

    const handleTags = (id) => {
        fetch(`${prefixUrl}pictures/show_tags?page=${1}&quantity=${13}&category_id=${id}`, {
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
                        idTag: tag[0],
                        isSelect:false // El tag_id está en el índice 0
                    }));
                    setTags(newTags);
                    console.log(tags)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        console.log(userData)
        document.body.className = ' bg-gradient-to-r from-gray-900 to-blue-gray-950';
        fetch(`${prefixUrl}pictures/show_categories?page=${1}}&quantity=${100}`, {
            method: 'GET',
            headers: {
                'Authorization': token // Envía el token en el encabezado Authorization
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data && data.status == 'success') {
                    const newFields = data.response.map(category => ({ field: category[1], id: category[0] }));
                    setCategories(newFields)
                    handleTags(newFields[0].id)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        document.body.className = ' bg-gradient-to-r from-gray-900 to-blue-gray-950 ';
        return () => {
            document.body.className = 'bg-black';
        };
    }, []);


    return (
        <div className="h-full w-full flex flex-col items-center gap-y-4 ">
            <ModalIMagen handleClose={handleCloseModal} image={image} isActive={isModalActive}/>
            {/* Fila para la imagen y el select */}
            <div className="flex justify-center items-center gap-x-10 flex-row">
            <div onClick={handleOpenModal} className="mt-24 w-3/5 h-60  min-h-[30rem] bg-gray-200 flex items-center justify-center hover:cursor-pointer">
                {image.link ? (
                    <img className="object-cover w-full h-full" src={image.link} alt="sin" />
                ) : (
                    <p className="text-gray-500">No Image Available</p>
                )}
                </div>
                <div className="self-start pt-24">
                    <select onChange={(e)=>handleTags(e.target.value)} about="hola" className="text-gray-700">
                        {categories.map((category) => (
                            <option value={category.id} className="text-gray-700" key={category.id*10}>
                                {category.field}
                            </option>
                        ))}
                    </select>
                    <div className="pt-2 flex flex-col gap-y-2 ">
                    {tags.length>0? tags.map((tag)=>(
                        <button 
                        onClick={(e)=>handleSelect(e,tag)}
                        className= {`px-2 ${tag.isSelect?"bg-green-700":"bg-gray-700"} rounded-full`} 
                        key={tag.idTag*3}>
                        {tag.name}
                        </button>
                    )):
                    <div className="flex justify-center items-center flex-col">
                      <p>Categoria sin etiquetas.</p>  
                      <p>Crea una</p>  
                      <FontAwesomeIcon className='pb-1 text-green-600' icon={faArrowDown} />
                      <button  onClick={handleClick} className="rounded-full bg-blue-700 px-6">Crear</button>
                    </div>}                    
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center ">
                <p>Raiting: <span>{raiting}</span></p>
                <input
                    value={raiting}
                    onChange={(e) => setRaiting(e.target.value)}
                    type="range"
                    step="0.5"
                    max={3}
                    min={1}
                    className="w-64" /* Controla el ancho del slider */
                />
            <p>Usuario: <span className="text-sky-300">{userName}</span></p>
            </div>

            {/* Fila para el rating debajo de la imagen y select */}

        </div>
    )
}

export default Etiquetador