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
    const { cardImagePage, setCardImagePage, setImage, image, userData, userName, albumInformation } = useAuth()
    const [raiting, setRaiting] = useState(1.0)
    const token = userData.token
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [isModalActive, setIsModalActive] = useState(false)
    const [tagsSelected, setTagsSelected] = useState([])
    const [isNextPage, setIsNextPage] = useState(true)
    const [categorySelected, setCategorySelected] = useState(null)
    const [maxPage, setMaxPage] = useState(1)

    useEffect(() => {
        document.body.className = ' bg-gradient-to-r from-gray-900 to-blue-gray-950';

        // conseguir el numero de la ultima pagina 
        const endPointPage = `pictures/show_picture_from_album?page=${cardImagePage}&quantity=${1}&album_id=${albumInformation.index}`
        handleGetData(endPointPage, token).then((data) => setMaxPage(data.total_pages))
        handleIsNextPage()

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



    }, [cardImagePage]);


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
                    isSelect: !tagEach.isSelect
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

    }

    const handleTags = (id) => {
        setCategorySelected(id)
        const endPoint = `pictures/show_tags?page=${1}&quantity=${13}&category_id=${id}`
        handleGetData(endPoint, token).then((data) => {
            if (data && data.status === 'success') {
                const newTags = data.response.map((tag) => ({
                    name: tag[1], // El nombre de la etiqueta está en el índice 1
                    idTag: tag[0],
                    isSelect: false // El tag_id está en el índice 0
                }));
                setTags(newTags);
            }
        }
        ).catch((error) => {
            console.error('Error:', error);
        });
    }
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
                                {tags.length > 0 ? tags.map((tag) => (
                                    <button
                                        onClick={(e) => handleSelect(e, tag)}
                                        className={`px-4 ${tag.isSelect ? "bg-green-700" : "bg-gray-700"} rounded-full border border-gray-600 hover:brightness-75`}
                                        key={tag.idTag * 3}>
                                        {tag.name}
                                    </button>
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
                        <p>Rating: <span>{raiting}</span></p>
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