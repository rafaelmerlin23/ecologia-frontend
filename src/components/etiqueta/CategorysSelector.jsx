import { useEffect } from "react";
import TagsPopover from "../imagenes/filterComponents/TagsPopover";
import handleGetData from "../../helpers/handleGetData";
import { useAuth } from "../../AuthProvider";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faCheck, faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import handleUpdate from "../../helpers/handleUpdate";
import prefixUrl from "../../helpers/ip";
import handleCreate from "../../helpers/handleCreate";
import { handleDelete } from "../../helpers/handleDelete";

export const CategorysSelector = () => {


    return (
        <TagsPopover content={<Categories />}>
            <div className="bg-zinc-700 w-[30vw] py-2 text-3xl rounded-full hover:opacity-60">
                Administrar categorias
            </div>
        </TagsPopover>
    )
}

export default CategorysSelector;

const Categories = () => {
    const {
        categories
        , setCategories
        , userData } = useAuth();
    const token = userData.token;
    const [searchText, setSearchText] = useState("");
    const [isCreateActive, setIsCreateActive] = useState(false)
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState("")
    const buttonClass = "px-3 py-2 hover:bg-zinc-400 rounded-full";



    useEffect(() => {
        if (!searchText) {
            setFilteredCategories(categories); // Mostrar todos si no hay búsqueda
        } else {
            const filtered = categories.filter((category) =>
                category.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredCategories(filtered);
        }
    }, [searchText, categories]);

    const onSelect = (index) => {
        let newCategories = [...categories]
        newCategories[index].isSelected = !newCategories[index].isSelected;
        setCategories(newCategories);
    };

    const togleEdit = (index) => {
        let newCategories = [...categories];

        newCategories[index].isEditActive = !newCategories[index].isEditActive;
        setCategories(newCategories);
    };

    const onChangeNameCategory = (e, index) => {
        let newCategories = [...categories];
        newCategories[index].name = e.target.value;
        setCategories(newCategories);
    }

    const onEditCategory = (id, newName, index) => {
        const form = new FormData()
        form.append('category_id', id);
        form.append('category_name', newName);
        const url = `${prefixUrl}tag_system/update_category`;
        handleUpdate(url, token, form, () => {
            let newCategories = [...categories];
            newCategories[index].isEditActive = false;
            newCategories[index].originalName = newName;
            setCategories(newCategories)
        })
    }

    const onCreateCategory = () => {
        if (newCategoryName.length < 5) {
            return
        }
        const url = `${prefixUrl}tag_system/create_category`;
        const form = new FormData()
        form.append('category_name', newCategoryName)
        handleCreate(url, token, form, (data) => {

            const newCategory = {
                name: data?.category?.[1],
                originalName: data?.category?.[1],
                id: data?.category?.[0],
                isSelected: false,
                isEditActive: false,
                willDeleted: false

            };
            setCategories(categories => [...categories, newCategory]);
            setIsCreateActive(false);
        })
    }

    const onDeleteCategory = (id) => {
        const endPoint = `tag_system/delete_category`
        const form = new FormData();
        form.append('category_id', id)
        handleDelete(endPoint, form, token, () => {
            const newCategories = categories.filter((category) => category.id != id);
            setCategories(newCategories);
        })
    }

    return (
        <div className="w-[60vw] p-4  bg-zinc-700 rounded-md flex justify-center items-center flex-col">
            {/* Barra de búsqueda */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar categorías..."
                    value={searchText}
                    minLength={5}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-[57vw] p-2 rounded-md text-sm bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            <button
                onClick={e => setIsCreateActive((prev) => !prev)}
                className={`mb-4 p-1 rounded-md w-[5vw] bg-green-700 disabled:opacity-50 ${!isCreateActive && "hover:bg-green-500"}`}
                disabled={isCreateActive}
            >
                <FontAwesomeIcon  icon={faPlus} />
            </button>

            <div className="overflow-y-auto max-h-[400px] font-bold flex gap-3 flex-col">
                {isCreateActive &&
                    <div className="flex flex-col xl:flex-row lg:flex-row">
                        <input
                            value={newCategoryName}
                            onChange={e => setNewCategoryName(e.target.value)}
                            className={`bg-zinc-500 border-zinc-500 border-2 px-2 rounded-l-md w-[45vw] overflow-hidden`}
                            type="text" />

                        <div className="rounded-r-md bg-gray-500 px-6 gap-4 flex justify-center items-center">
                            <button
                                className={buttonClass}
                                onClick={() => setIsCreateActive(false)}
                            >
                                <FontAwesomeIcon icon={faCancel} />
                            </button>
                            <button
                                className={buttonClass}
                                onClick={onCreateCategory}
                                >
                                <FontAwesomeIcon icon={faCheck} />

                            </button>
                        </div>
                    </div>
                }
                {filteredCategories.map((category, index) => (
                    (category.isEditActive ?
                        <div key={index} className="flex flex-col xl:flex-row lg:flex-row">
                            <input
                                onChange={(e) => onChangeNameCategory(e, index)}
                                value={category.name}
                                className={`bg-zinc-500  text-sm border-zinc-500 border-2 px-2 rounded-l-md w-[45vw] overflow-hidden`}
                                type="text" />

                            <div className="rounded-r-md bg-gray-500 px-6 gap-4 flex justify-center items-center">
                                <button
                                    onClick={() => onEditCategory(category.id, category.name, index)}
                                    className={buttonClass}>
                                    <FontAwesomeIcon icon={faCheck} />

                                </button>
                                <button
                                    className={buttonClass}
                                    onClick={() => togleEdit(index)}
                                >
                                    <FontAwesomeIcon icon={faCancel} />
                                </button>
                            </div>
                        </div> :
                        (category.willDeleted ?
                            <div key={index} className="flex flex-col xl:flex-row lg:flex-row">
                                <button
                                    type='button'
                                    onClick={() => onSelect(index)}
                                    className={`gap-4 rounded-l-md w-[45vw] overflow-hidden whitespace-nowrap text-ellipsis px-2  text-sm  flex border-4 border-red-500 bg-zinc-800`}
                                    key={index}
                                >
                                    <p className="text-red-500">¿Eliminar categoria?</p> {category.originalName}
                                </button>
                                <div className="rounded-r-md bg-gray-500 px-6 gap-4 flex justify-center items-center">
                                    <button className={buttonClass}
                                        onClick={() => {
                                            let newCategories = [...categories];
                                            newCategories[index].willDeleted = false;
                                            setCategories(newCategories);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faCancel} />
                                    </button>
                                    <button
                                        className={buttonClass}
                                        onClick={(e) => onDeleteCategory(category.id)}
                                    >
                                        <FontAwesomeIcon icon={faCheck} />
                                    </button>
                                </div>
                            </div>
                            :

                            <div key={index} className="flex flex-col xl:flex-row lg:flex-row">
                                <button
                                    type='button'
                                    onClick={() => onSelect(index)}
                                    className={` rounded-l-md w-[45vw] overflow-hidden whitespace-nowrap text-ellipsis px-2  hover:brightness-200 hover:bg-transparent hover:border-4 hover:border-green-700 hover:text-green-500 disabled:opacity-40 text-sm  flex  ${category.isSelected
                                        ? "brightness-200 bg-transparent border-4 border-green-800 text-green-900"
                                        : "border-4 border-zinc-800 bg-zinc-800"
                                        }`}
                                    key={index}
                                >
                                    {category.originalName}
                                </button>
                                <div className={` rounded-r-md bg-gray-500 px-6 gap-4 flex justify-center items-center`}>
                                    <button className={buttonClass}
                                        onClick={() => togleEdit(index)}
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button
                                    className={buttonClass}
                                        onClick={() => {
                                            let newCategories = [...categories]
                                            newCategories[index].willDeleted = true;
                                            setCategories(newCategories);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                        )
                    )
                ))}
                {filteredCategories.length === 0 && (
                    <p className="text-sm text-gray-400 text-center">Sin resultados</p>
                )}
            </div>
        </div>
    )

}

