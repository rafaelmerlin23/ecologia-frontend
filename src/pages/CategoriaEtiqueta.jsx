import { useEffect } from "react"
import { useAuth } from "../AuthProvider"
import { CategorysSelector } from "../components/etiqueta/CategorysSelector"
import handleGetData from "../helpers/handleGetData"
import Tags from "../components/etiqueta/Tags"
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

    useEffect(() => {
        // Cambiar la clase del body cuando el componente se monta
        document.body.className = "bg-gradient-to-r from-gray-900 to-blue-gray-950";
    
        // Limpiar las clases al desmontar el componente
        return () => {
          document.body.className = "bg-black";
        };
      }, []);

    return (

        <div className="mt-32">
            <CategorysSelector />
            <div className="mt-14 flex justify-center items-center flex-col">
            {categories.filter(category => category.isSelected).map((category, index) => (
                <div key={index}>
                <label 
                className="mt-14 rounded-2xl px-10 bg-gray-700 flex  justify-start text-3xl mb-6"> {category.name}</label>
                <Tags  categoryId={category.id}/>
                </div>
            ))}
            </div>
        </div>

    )

}

export default CategoriaEtiqueta