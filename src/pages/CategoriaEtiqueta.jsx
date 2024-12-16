import { useEffect } from "react"
import { useAuth } from "../AuthProvider"
import { CategorysSelector } from "../components/etiqueta/CategorysSelector"
import handleGetData from "../helpers/handleGetData"
export const CategoriaEtiqueta = () => {


    const { categories, setCategories, userData } = useAuth()
    const token = userData.token

    useEffect(() => {

        const getData = async () => {
            const endpoint = `tag_system/show_categories`;
            const response = await handleGetData(endpoint, token);
            const categories = []
            response?.response.forEach(category => {
                if (category?.[0] != 1) {
                    categories.push(
                        {
                            name: category?.[1],
                            originalName: category?.[1],
                            id: category?.[0],
                            isSelected: true,
                            isEditActive: false,
                            willDeleted: false
                        }
                    )
                }
            });


            console.log(categories);
            setCategories(categories);
        }
        getData();
    }, [])



    return (

        <div className="mt-32">
            <CategorysSelector />
            {categories.filter(category => category.isSelected).map((category, index) => (
                <p key={index} className="">{category.name}</p>
            ))}
        </div>

    )

}

export default CategoriaEtiqueta