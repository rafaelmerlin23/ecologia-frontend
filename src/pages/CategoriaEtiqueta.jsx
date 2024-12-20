import { useEffect, useState } from "react"
import { useAuth } from "../AuthProvider"
import { CategorysSelector } from "../components/etiqueta/CategorysSelector"
import handleGetData from "../helpers/handleGetData"
import Tags from "../components/etiqueta/Tags"
import { PieChart } from "@mui/x-charts"
export const CategoriaEtiqueta = () => {


    const { categories, setCategories, userData,allTags } = useAuth();
    const token = userData.token;
    const [categoriesInfo,setCategoriesInfo] = useState([]);

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

    useEffect(()=>{
        if(Object.keys(allTags).length  === categories.length){
           const keys = Object.keys(allTags);
           let total_tags = {}
           keys.forEach(key=>{
                let total = 0;
                allTags[key].forEach(tag=>{
                    total += tag.used;
                })
                total_tags[key] = total;
           })
           console.log("total ",total_tags);
           const newCategoriesInfo = []
           keys.forEach((key,index)=>{
                newCategoriesInfo.push({
                    id:index,value:total_tags[key],label:key
                   });
           });

           const series =[
            {
              data: newCategoriesInfo,
            },
          ]
           console.log("categorias",newCategoriesInfo);
           setCategoriesInfo(series);
        }
    },
    [allTags])

    useEffect(() => {
        // Cambiar la clase del body cuando el componente se monta
        document.body.className = "bg-gradient-to-r from-gray-900 to-blue-gray-950";
    
        // Limpiar las clases al desmontar el componente
        return () => {
          document.body.className = "bg-black";
        };
      }, []);

    return (

          <div className="mt-32 mb-24">
             <CategorysSelector />
            
             
            <div className="mt-14 flex justify-center items-center flex-col">
            <div className="flex justify-center items-center hidden xl:block bg-zinc-500 rounded-xl w-[60vw] ">
            { categoriesInfo.length >0 && Object.keys(allTags).length === categories.length  && 
            <>
            <label 
                className="bg-zinc-700 flex  px-10  flex  justify-start text-4xl mb-6 rounded-t-xl"> Proporción de uso</label>
            <PieChart
            className="mx-auto mb-4 ml-[24vw]"
            series={categoriesInfo}
            slotProps= {{ legend: { hidden: true }} }
            width={300}
            height={200}
            />
            <div className=" bg-zinc-700 text-gray-200 grid grid-cols-1 gap-4">
            <div 
                className="grid grid-cols-2 border-gray-200 items-center gap-2 p-2 border-b"
                id="titulo"
                >
                <p className="font-bold">Nombre</p>
                <p className="font-bold">Cantidad de usos</p>
                </div>
            {categoriesInfo[0].data.map(ct => (
                <div 
                className="grid grid-cols-2 border-gray-200 items-center gap-2 p-2 border-b"
                key={ct.index}
                >
                <p >{ct.label}</p>
                <p>{ct.value}</p>
                </div>
            ))}
            </div>
            </>
            }
            </div>
            {categories.filter(category => category.isSelected).map((category, index) => (
                <div key={index}>
                <label 
                className="mt-14  sm:rounded-2xl px-10 bg-gray-700 flex  justify-start text-3xl mb-6"> {category.name}</label>
                <Tags  categoryName={category.name} categoryId={category.id}/>
                </div>
            ))}
            </div>
        </div>

    )

}

export default CategoriaEtiqueta