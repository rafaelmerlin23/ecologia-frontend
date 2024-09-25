import { useAuth } from "../../AuthProvider"
import { useEffect, useState } from "react";
import prefixUrl from "../../helpers/ip";
import ModalIMagen from "./ModalIMagen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown,faGreaterThan,faLessThan} from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";
import handleGet from "../../helpers/handleGet";

export const Etiquetador = ({isActive,handleClose}) => {
    if(!isActive) return null
    const navigate = useNavigate()
    const {cardImagePage,setCardImagePage, setImage,image,userData,userName,albumInformation} = useAuth()
    const [raiting, setRaiting] = useState(1.0)
    const token = userData.token
    const [categories, setCategories] = useState([])
    const [tags,setTags] = useState([])
    const [isModalActive,setIsModalActive] = useState(false)
    const [tagsSelected,setTagsSelected] = useState([])
    const [isNextPage,setIsNextPage] = useState(true)


    const handleClick = () => {
        // Aquí puedes realizar alguna lógica antes de redirigir
        navigate('../categoria-etiqueta');
      };

    const handleNext = () =>{
        console.log(cardImagePage)
        fetch(`${prefixUrl}pictures/show_picture_from_album?page=${cardImagePage+1}&quantity=${1}&album_id=${albumInformation.index}`, {
            method: 'GET',
            headers: {
              'Authorization': token // Envía el token en el encabezado Authorization
            }
          })
            .then((res) => res.json())
            .then((data) => {
              if (data && data.status == 'success') {
                console.log(data.response)
                const newImages = data.response.map((response)=>(
                    {
                      link:response[0],
                      id:response[1],
                      date:response[2],
                    }
                  ))
                setImage(newImages[0])
                setCardImagePage((CardImagePage)=>CardImagePage+1)
                
            }
      
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        handleIsNextPage(2)
    }

    const handleIsNextPage = (step)=>{
        fetch(`${prefixUrl}pictures/show_picture_from_album?page=${cardImagePage+step}&quantity=${1}&album_id=${albumInformation.index}`, {
            method: 'GET',
            headers: {
              'Authorization': token // Envía el token en el encabezado Authorization
            }
          })
            .then((res) => res.json())
            .then((data) => {
              if (data && data.status == 'success') {
                console.log(data.response)
                const newImages = data.response.map((response)=>(
                    {
                      link:response[0],
                      id:response[1],
                      date:response[2],
                    }
                  ))
                if(newImages.length === 0){
                    setIsNextPage(false)
                }else{
                    setIsNextPage(true)
                }
            }
            })
            .catch((error) => {
              console.error('Error:', error);
            });
    }

    const handlePrevious = () =>{
        const endPoint = `pictures/show_picture_from_album?page=${cardImagePage-1}&quantity=${1}&album_id=${albumInformation.index}`
        const data = handleGet(endPoint,token)
        console.log(data)
        // const newImages = data.response.map((response)=>(
        //     {
        //       link:response[0],
        //       id:response[1],
        //       date:response[2],
        //     }
        //   ))
        // setImage(newImages[0])
        // setCardImagePage(cardImagePage=>cardImagePage-1)
    }

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
        handleIsNextPage(1)
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

    }, []);


    return (
        <div className=' fixed z-40 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
         <div className="bg-black border-1 border-white p-10  rounded-3xl">
         <button onClick={handleClose} className=' absolute top-2 right-2 text-white text-xl hover:opacity-70'>
            x
        </button>

        {cardImagePage !==1 ?<button  onClick={handlePrevious}
        className='flex justify-center items-center py-3 px-3 bg-white rounded-full absolute top-1/2 left-2 text-white text-xl hover:opacity-70'>
            <FontAwesomeIcon className="text-sm text-black" icon={faLessThan}/>
        </button>:""}
        {isNextPage? <button onClick={handleNext} 
        className='flex justify-center items-center py-3 px-3 bg-white  rounded-full absolute top-1/2 right-2 text-white text-xl hover:opacity-70'>
            <FontAwesomeIcon className="text-sm text-black" icon={faGreaterThan}/>
        </button>:""}       
        <div className="h-full w-full flex flex-col items-center gap-y-4 ">
           
            <ModalIMagen handleClose={handleCloseModal} image={image} isActive={isModalActive}/>
            
            {/* Fila para la imagen y el select */}
            <div className="flex justify-center items-center gap-x-10 sm:flex-col flex-col md:flex-row lg:flex-row xl:flex-row">
            <div onClick={handleOpenModal} className="w-3/5 h-60  min-h-[30rem] bg-gray-200 flex items-center justify-center hover:cursor-pointer">
                {image.link ? (
                    <img className="object-cover w-full h-full" src={image.link} alt="sin" />
                ) : (
                    <p className="text-gray-500">No Image Available</p>
                )}
                </div>
                <div className="self-start ">
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
            <div>
                    <button className="bg-cyan-500 text-black py-1 px-4 rounded-full">
                        Guardar
                    </button>
            </div> 
            </div>
        </div>
        </div>

    )
}

export default Etiquetador