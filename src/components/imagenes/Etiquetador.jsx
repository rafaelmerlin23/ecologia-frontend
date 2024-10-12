import { useAuth } from "../../AuthProvider"
import { useEffect, useState } from "react";
import prefixUrl from "../../helpers/ip";
import ModalIMagen from "./ModalIMagen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faGreaterThan, faLessThan } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";
import handleGetData from "../../helpers/handleGetData";
import handleGet from "../../helpers/handleGet";

export const Etiquetador = ({ isActive, handleClose }) => {

    const navigate = useNavigate()
    const { cardImagePage, setCardImagePage, setImage, image, userData, albumInformation } = useAuth()
    const token = userData.token
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [isModalActive, setIsModalActive] = useState(false)
    const [tagsSelected, setTagsSelected] = useState([])
    const [isNextPage, setIsNextPage] = useState(true)
    const [categorySelected, setCategorySelected] = useState(null)
    const [maxPage, setMaxPage] = useState(1)
    const userName = userData.userName
    const userID = userData.decoded.user_id

    useEffect(() => {
        document.body.className = ' bg-gradient-to-r from-gray-900 to-blue-gray-950';
        

        // conseguir el numero de la ultima pagina 
        const endPointPage = `pictures/show_picture_from_album?page=${cardImagePage}&quantity=${1}&album_id=${albumInformation.index}`
        handleGetData(endPointPage, token).then((data) => {
            setMaxPage(data.total_pages)
            handleIsNextPage()           
        })

        const endPointCategories = `pictures/show_categories?page=${1}}&quantity=${100}`

        //obtener categorias
        handleGetData(endPointCategories, token).then(
            (data) => {
                if (data && data.status == 'success') {
                    let newFields = []
                    data.response.forEach(category => {
                        if (category[0] != 1) {
                            newFields.push({ field: category[1], id: category[0] })
                        }
                    });
                    setCategories(newFields)
                    handleTags(newFields[0].id)
                }
            }
        ).catch((error) => console.error(error))



    }, [cardImagePage,tags]);


    const handleClick = () => {
        // Aquí puedes realizar alguna lógica antes de redirigir
        navigate('../categoria-etiqueta');
    };

    const handleNext = () => {
        const endPoint = `pictures/show_picture_from_album?page=${cardImagePage + 1}&quantity=${1}&album_id=${albumInformation.index}`

        handleGetData(endPoint, token).then((data) => {
            if (data && data.status == 'success') {
                const newImages = data.response.map((response) => (
                    {
                        link: response[0],
                        id: response[1],
                        date: response[2],
                    }
                ))
                setImage(newImages[0])
                setCardImagePage((CardImagePage) => CardImagePage + 1)
                handleIsNextPage(2)
            }
        }).catch((error) => {
            console.error('Error:', error);
        });
    }

    const handleIsNextPage = () => {
        if (cardImagePage < maxPage) {
            setIsNextPage(true)
        } else {
            setIsNextPage(false)
        }
    }

    const handlePrevious = async () => {
        const endPoint = `pictures/show_picture_from_album?page=${cardImagePage - 1}&quantity=${1}&album_id=${albumInformation.index}`
        let data = [image]
        try {
            data = await handleGet(endPoint, token)
        } catch (error) {
            console.error(error)
        }
        const newImages = data.map((response) => (
            {
                link: response[0],
                id: response[1],
                date: response[2],
            }
        ))
        handleIsNextPage(0)
        setImage(newImages[0])
        setCardImagePage(cardImagePage => cardImagePage - 1)
    }

    const handleSelect = (e, tag) => {
        e.preventDefault()
        setTagsSelected(tagsSelected => [...tagsSelected, tag.idTag])
        let newTags = []
        tags.forEach((tagEach) => {
            if (tagEach === tag) {
                newTags.push({
                    name: tagEach.name, // El nombre de la etiqueta está en el índice 1
                    idTag: tagEach.idTag,
                    isSelect: !tagEach.isSelect,
                    rating: tagEach.rating
                })
            } else {
                newTags.push(tagEach)
            }
        })
        setTags(newTags)
        const newTagsSelected = []
        newTags.forEach((newTag) => {
            if (newTag.isSelect) {
                newTagsSelected.push(newTag.idTag)
            }
        })
        setTagsSelected(newTagsSelected)
    }

    const handleCloseModal = () => {
        setIsModalActive(false)
    }

    const handleOpenModal = () => {
        setIsModalActive(true)
    }

    const onLabel = () => {
        for(let tag of tags){
            if(tag.isSelect){
                const formData = new FormData();
                formData.append('picture_id', image.id);
                formData.append('user_id', userID);
                formData.append('tag_id', tag.idTag);
                formData.append('rating_score', tag.rating);
                
                // Hacer la petición POST
                fetch(`${prefixUrl}miscellaneous/create_rating`, {
                  method: 'POST',
                  headers: {
                    'Authorization': token 
                  },
                  body: formData 
                })
                  .then((res) => res.json())
                  .then((data) => {
                    console.log('Respuesta del servidor:', data);
                    if (data && data.status === 'success') {
                      console.log(data);
                    }
                  })
                  .catch((error) => {
                    console.error('Error:', error);
                  });
            }
        }
    }

    const handleRatingChange = (e, tagIndex) => {
        const newTags = tags.map((tag, index) => {
          if (index === tagIndex) {
            return {
              ...tag, 
              rating: e.target.value, 
            };
          }
          return tag;
        });
      
        setTags(newTags); 
      };
      
    

    
      const handleTags = (id) => {
        setCategorySelected(id);
        const endPoint = `pictures/show_tags?page=${1}&quantity=${13}&category_id=${id}`;
    
        handleGetData(endPoint, token).then((data) => {
            if (data && data.status === 'success') {
                const newTags = data.response.map((tag) => ({
                    name: tag[1], // El nombre de la etiqueta está en el índice 1
                    idTag: tag[0],
                    isSelect: false, // El tag_id está en el índice 0
                    rating: 2,
                }));
    
                // Ahora, obtenemos las calificaciones de las imágenes
                handleGetData(`miscellaneous/show_ratings_from_picture?picture_id=${image.id}`, token).then((data) => {
                    if (data.response.length !== 0) {
                        console.log(data.response)
                        // Crear un objeto para las calificaciones, donde la clave es el idTag
                        const ratingsMap = {};
                        data.response.forEach((rating) => {
                            ratingsMap[rating[4]] = rating[2]; // rating[4] es idTag y rating[2] es el score
                        });
    
                        // Actualizar el estado de los tags con calificaciones
                        const updatedTags = newTags.map((tag) => {
                            if (ratingsMap[tag.idTag]) {
                                return {
                                    ...tag,
                                    isSelect: true,
                                    rating: ratingsMap[tag.idTag], // Establecer la calificación si existe
                                };
                            }
                            return tag;
                        });
    
                        setTags(updatedTags); // Actualiza el estado una sola vez
                    } else {
                        // Si no hay ratings, solo actualiza los tags
                        setTags(newTags);
                    }
                });
            }
        }).catch((error) => {
            console.error('Error:', error);
        });
    };
    
    
    if (!isActive) return null
    return (
        <div
            onClick={handleClose}
            className=' fixed z-40 inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center'>
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-zinc-900 border border-gray-300 p-10  rounded-3xl flex justify-center items-center">
                <button onClick={handleClose} className=' absolute top-2 right-2 text-white text-xl hover:opacity-70'>
                    x
                </button>

                {cardImagePage !== 1 ? <button onClick={handlePrevious}
                    className='flex justify-center items-center py-3 px-3 bg-white rounded-full absolute top-1/2 left-2 text-white text-xl hover:opacity-70'>
                    <FontAwesomeIcon className="text-sm text-black" icon={faLessThan} />
                </button> : ""}
                {isNextPage ? <button onClick={handleNext}
                    className='flex justify-center items-center py-3 px-3 bg-white  rounded-full absolute top-1/2 right-2 text-white text-xl hover:opacity-70'>
                    <FontAwesomeIcon className="text-sm text-black" icon={faGreaterThan} />
                </button> : ""}
                <div className="h-full w-full flex flex-col justify-center items-center gap-y-4 ">

                    <ModalIMagen handleClose={handleCloseModal} image={image} isActive={isModalActive} />

                    {/* Fila para la imagen y el select */}
                    <div className=" flex justify-center items-center gap-x-10 sm:flex-col flex-col md:flex-col lg:flex-row xl:flex-row">
                        <div onClick={handleOpenModal} className=" w-3/5 h-60  min-h-[30rem] bg-gray-200 flex items-center justify-center hover:cursor-pointer">
                            {image.link ? (
                                <img className=" object-cover w-full h-full" src={image.link} alt="sin" />
                            ) : (
                                <p className="text-gray-500">No Image Available</p>
                            )}
                        </div>
                        <div className="sm:invisible visible lg:visible md:visible xl:visible inline-block xl:min-h-[30rem] w-0.5 bg-zinc-600"></div>
                        <div className="flex-col  lg:self-start xl:self-start sm:flex sm:flex sm:justify-center sm-items-center sm:flex">
                            <select onChange={(e) => handleTags(e.target.value)} about="hola" className="text-gray-700">
                                {categories.map((category) => (
                                    <option value={category.id} className="text-gray-700" key={category.id * 10}>
                                        {category.field}
                                    </option>
                                ))}
                            </select>
                            <div className="pt-4 flex flex-col gap-y-2 ">
                                {tags.length > 0 ? tags.map((tag,index) => (
                                    <div className="">
                                    <button
                                        onClick={(e) => handleSelect(e, tag)}
                                        className={`w-[100%] px-4 ${tag.isSelect ? "bg-green-700" : "bg-gray-700"} rounded-full border border-gray-600 hover:brightness-75`}
                                        key={tag.idTag * 3}>
                                        {tag.name}
                                    </button>
                                    {tag.isSelect?
                                    <div className="flex justify-center items-center flex-col">
                                        <p>Selecciona la calificacion de la etiqueta:  <span className="text-sky-300">{tags[index].rating}</span></p>
                                        <input
                                        onChange={(e)=>handleRatingChange(e,index)}
                                        value={tags[index].rating}
                                        type="range"
                                        step="0.5"
                                        max={3}
                                        min={0}
                                    />
                                    </div>
                                    :""}
                                    </div>
                                )) :
                                    <div className="flex justify-center items-center flex-col">
                                        <p>Categoria sin etiquetas.</p>
                                        <p>Crea una</p>
                                        <FontAwesomeIcon className='pb-1 text-green-600' icon={faArrowDown} />
                                        <button onClick={handleClick} className="rounded-full bg-blue-700 px-6">Crear</button>
                                    </div>}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center ">
                       
                        <p>Usuario: <span className="text-sky-300">{userName}</span></p>
                    </div>
                    <div>
                        <button onClick={onLabel} className="bg-cyan-500 text-black py-1 px-4 rounded-full">
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Etiquetador