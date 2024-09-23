import { useAuth } from "../../AuthProvider"
import { useEffect, useState } from "react";
import prefixUrl from "../../helpers/ip";

export const Etiquetador = () => {
    const { image, userData } = useAuth()
    const [raiting, setRaiting] = useState(1.0)
    const token = userData.token
    const [categories, setCategories] = useState([])
    const [categorySelected,setCategorySelected] = useState(null)
    const [tags,setTags] = useState([])

    const handleTags = (id) => {
        fetch(`${prefixUrl}pictures/show_tags?page=${1}&quantity=${100}&category_id=${id}`, {
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
                        idTag: tag[0] // El tag_id está en el índice 0
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
            {/* Fila para la imagen y el select */}
            <div className="flex justify-center items-center gap-x-10 flex-row">

                <img className="pt-24 object-cover w-1/2 h-3/5" src={image.link} alt="sin" />
                <div className="self-start pt-24">
                    <select onChange={(e)=>handleTags(e.target.value)} about="hola" className="text-gray-700">
                        {categories.map((category) => (
                            <option value={category.id} className="text-gray-700" key={category.id*10}>
                                {category.field}
                            </option>
                        ))}
                    </select>
                    {tags.map()}                    
                </div>
            </div>
            <div className="flex flex-col items-center mr-48">
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
            </div>

            {/* Fila para el rating debajo de la imagen y select */}

        </div>
    )
}

export default Etiquetador