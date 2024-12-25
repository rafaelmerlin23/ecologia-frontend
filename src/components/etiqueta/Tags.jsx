import { useEffect, useState } from "react";
import handleGetData from "../../helpers/handleGetData";
import { useAuth } from "../../AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faCheck, faEdit, faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import handleCreate from "../../helpers/handleCreate";
import prefixUrl from "../../helpers/ip";
import handleUpdate from "../../helpers/handleUpdate";
import { handleDelete } from "../../helpers/handleDelete";
import { PieChart } from "@mui/x-charts";
import { useCategoryTags } from "../providers/CategoryTagsProvider";

export const Tags = ({ categoryId, categoryName }) => {
    const {
        userData
    } = useAuth();
    const { allTags, setAllTags } = useCategoryTags()
    const token = userData.token;
    const [tags, setTags] = useState([]);
    const [isCreateActive, setIsCreateActive] = useState(false);
    const [newTag, setNewTag] = useState('');
    const buttonClass = "px-3 py-2 hover:bg-zinc-600 rounded-full";
    const [serieTags, setSeriesTags] = useState([])

    useEffect(() => {
        const getData = async () => {
            const endPoint = `tag_system/show_tags?category_id=${categoryId}`;
            const tagsResponse = await handleGetData(endPoint, token);

            let newTags = tagsResponse.response.map((tag) => ({
                id: tag?.[0],
                name: tag?.[1],
                originalName: tag?.[1],
                categoryId: tag?.[2],
                isEditActive: false,
                willDeleted: false,
                used: 0
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

                setAllTags(alltags => ({
                    ...alltags,
                    [categoryName]: newTagsWithUsed
                }));
                // { id: 0, value: 10, label: 'series A' },
                const newSeries = [
                    {
                        data: newTagsWithUsed.map(tag => ({
                            id: tag.id, value: tag.used, label: tag.name
                        })),
                    },
                ];


                setSeriesTags(newSeries);

            } else {
                setTags(newTags);
                setAllTags(alltags => ({
                    ...alltags,
                    [categoryName]: newTags
                }));
            }

        }
        getData();
        allTags[categoryName]?.length > 0 && console.log("tags tags", allTags);
    }, [])

    const onCreateTag = () => {
        const url = `${prefixUrl}tag_system/create_tag`;
        const form = new FormData();
        form.append('category_id', categoryId);
        form.append('tag_name', newTag);

        handleCreate(url, token, form, (data) => {
            setAllTags(allTag => ({
                ...allTag,
                [categoryName]: [...allTag[categoryName],
                {
                    id: data?.tag_id,
                    name: data?.tag_name,
                    originalName: data?.tag_name,
                    categoryId: categoryId,
                    isEditActive: false,
                    willDeleted: false,
                    used: 0
                }]
            }))
            setNewTag('');
            setIsCreateActive(false);
        });

    }

    const onEditTag = (index) => {
        const url = `${prefixUrl}tag_system/update_tag`;
        const form = new FormData();
        form.append('tag_id', allTags[categoryName][index].id);
        form.append('tag_name', allTags[categoryName][index].name);
        form.append('category_id', categoryId);
        handleUpdate(url, token, form, () => {
            let newTags = [...allTags[categoryName]];
            newTags[index].originalName = allTags[categoryName][index].name;
            newTags[index].isEditActive = false
            setAllTags(alltags => ({
                ...alltags,
                [categoryName]: newTags
            }));
        })

    }

    const onChangeTag = (index, e) => {
        let newTags = [...allTags[categoryName]];
        newTags[index].name = e.target.value;
        setAllTags(alltags => ({
            ...alltags,
            [categoryName]: newTags
        }));
    }

    const onDeleteTag = (index) => {
        const endPoint = `tag_system/delete_tag`;
        const form = new FormData();
        const id = allTags[categoryName][index]?.id;
        form.append('tag_id', id);
        handleDelete(endPoint, form, token, () => {
            const newTags = allTags[categoryName]?.filter(tag => tag.id != id);
            setAllTags(alltags => ({
                ...alltags,
                [categoryName]: newTags
            }));
        });
    }

    const isEmptyCategory = () => {
        if (allTags[categoryName]?.length === 0) return true
        return allTags[categoryName]?.every(tag => tag.used == 0);
    }

    return (
        <div className="flex justify-center items-center flex-col sm:flex-col xl:flex-row lg:flex-row">
            <div className="w-[90vw]  sm:w-[90vw] lg:w-[60vw] xl:w-[60vw] ">

                <div
                    className="flex justify-center items-center w-full  bg-gray-400 py-2 rounded-xl mb-6">
                    {(allTags[categoryName]?.length > 0 && serieTags.length > 0 && !isEmptyCategory()) &&
                        <PieChart
                            key={categoryId}
                            className="mx-auto ml-24"
                            series={serieTags}
                            width={300}
                            margin={0}
                            height={300}
                            slotProps={{ legend: { hidden: true } }}
                        />
                    }
                    {
                        isEmptyCategory() &&
                        <div className="flex flex-row gap 4 items-center gap-4">
                            <FontAwesomeIcon className="ml-4 text-red-500" icon={faCancel} />
                            <p className=" text-black text-1xl">Sin información</p>
                        </div>
                    }
                </div>

                <div className="flex justify-center mb-10 ">
                    <button
                        onClick={() => setIsCreateActive(prev => !prev)}
                        disabled={isCreateActive}
                        className={`disabled:opacit-50 ${!isCreateActive && "hover:brightness-150"}`}
                    >
                        <FontAwesomeIcon className="bg-green-700 p-1 rounded-md w-[5vw]" icon={faPlus} />
                    </button>
                </div>
                {isCreateActive &&
                    <div className="mb-10 flex-col sm:flex-col xl:flex-row lg:flex-row">
                        <input
                            value={newTag}
                            placeholder="Nueva etiquetaz"
                            onChange={e => setNewTag(e.target.value)}
                            className="bg-zinc-700 w-full pr-10 py-2 px-2" />
                        <div
                            className="flex gap-10 pl-auto bg-zinc-800 px-4 py-1">
                            <button
                                className={buttonClass}
                                onClick={() => setIsCreateActive(false)}
                            >
                                <FontAwesomeIcon icon={faCancel} />
                            </button>
                            <button
                                className={buttonClass}
                                onClick={onCreateTag}
                            >
                                <FontAwesomeIcon icon={faCheck} />
                            </button>
                        </div>
                    </div>
                }
                {allTags[categoryName]?.length > 0 && allTags[categoryName]?.map((tag, index) => (
                    <div key={index}>
                        {!tag.isEditActive && !tag.willDeleted &&
                            <>
                                <div className="mb-4 flex flex-row gap-2 items-center" >
                                    <label
                                        className="w-[24.5vw]  overflow-hidden text-ellipsis" // Max-width and text ellipsis
                                    >
                                        {tag.originalName}
                                    </label>
                                    <label
                                        className="ml-[4vw] bg-transparent border border-gray-400 px-4 rounded-md max-w-xs overflow-hidden text-ellipsis text-center" // Apply max width and text ellipsis
                                    >
                                        {tag.used}
                                    </label>
                                    <div
                                        className="flex gap-10 ml-auto">
                                        <button
                                            className={buttonClass}
                                            onClick={() => {
                                                let newTags = [...allTags[categoryName]]
                                                newTags[index].isEditActive = true
                                                setAllTags(alltags => ({
                                                    ...alltags,
                                                    [categoryName]: newTags
                                                }));
                                            }}>
                                            <FontAwesomeIcon icon={faPen} />
                                        </button>
                                        <button
                                            className={buttonClass}
                                            onClick={() => {
                                                let newTags = [...allTags[categoryName]]
                                                newTags[index].willDeleted = true
                                                setAllTags(alltags => ({
                                                    ...alltags,
                                                    [categoryName]: newTags
                                                }));
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                                <hr className="mb-6" />
                            </>}
                        {tag.isEditActive &&
                            <>
                                <div className="mb-4 flex flex-row gap-2 items-center" key={index}>
                                    <input
                                        value={tag.name}
                                        onChange={e => onChangeTag(index, e)}
                                        type="text"

                                        className="bg-transparent text-white border w-[24.5vw]  overflow-hidden text-ellipsis" // Max-width and text ellipsis
                                    />

                                    <label
                                        className="ml-[4vw] bg-transparent border border-gray-400 px-4 rounded-md max-w-xs overflow-hidden text-ellipsis text-center" // Apply max width and text ellipsis
                                    >
                                        {tag.used}
                                    </label>
                                    <div
                                        className="flex gap-10 ml-auto">
                                        <button
                                            className={buttonClass}
                                            onClick={() => onEditTag(index)}
                                        >
                                            <FontAwesomeIcon icon={faCheck} />
                                        </button>
                                        <button
                                            className={buttonClass}
                                            onClick={() => {
                                                let newTags = [...allTags[categoryName]]
                                                newTags[index].isEditActive = false
                                                setAllTags(alltags => ({
                                                    ...alltags,
                                                    [categoryName]: newTags
                                                }));
                                            }}>
                                            <FontAwesomeIcon icon={faCancel} />
                                        </button>
                                    </div>
                                </div>
                                <hr className="mb-6" />
                            </>}
                        {tag.willDeleted &&
                            <>
                                <div className="mb-4 flex flex-row gap-2 items-center" key={index}>
                                    <label
                                        className="w-[24.5vw]  overflow-hidden text-ellipsis" // Max-width and text ellipsis
                                    >
                                        <span className="text-red-500">¿Eliminar etiqueta? </span> {tag.originalName}
                                    </label>

                                    <label
                                        className="ml-[4vw] bg-transparent border border-red-500 text-red-500 px-4 rounded-md max-w-xs overflow-hidden text-ellipsis text-center" // Apply max width and text ellipsis
                                    >
                                        {tag.used}
                                    </label>
                                    <div
                                        className="flex gap-10 ml-auto">
                                        <button
                                            className={buttonClass}
                                            onClick={() => {
                                                let newTags = [...allTags[categoryName]];
                                                newTags[index].willDeleted = false;
                                                setAllTags(alltags => ({
                                                    ...alltags,
                                                    [categoryName]: newTags
                                                }));
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faCancel} />
                                        </button >
                                        <button
                                            className={buttonClass}
                                            onClick={() => onDeleteTag(index)}
                                        >
                                            <FontAwesomeIcon icon={faCheck} />
                                        </button>
                                    </div>
                                </div>
                                <hr className="border border-red-500 mb-6" />
                            </>}
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Tags;