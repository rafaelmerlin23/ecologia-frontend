import { useEffect, useState } from "react"
import Overlay from "../components/Overlay"
import { useAuth } from "../AuthProvider"
export const FormularioPuntos = ({ location = {
    locationId: '',
    name: '',
    coordinates: '',
    projectId: ''
}, handle, message, closeLocationForm }) => {
    
    const [name, setName] = useState(location.name)
    const [latitude, setLatitude] = useState(location.coordinates.slice(0,location.coordinates.search(',')))
    const [longitude, setLongitude] = useState(location.coordinates.slice(location.coordinates.search(',')+2,location.coordinates.length-1))

    return (
        <Overlay animacion={closeLocationForm}>
            <form onSubmit={(e) => handle(e,name,latitude,longitude,location.index)} className=" p-5 xl:w-80 lg:w-80 md:w-80 ">
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                    < input value={name} onChange={(e) => {
                        setName(e.target.value)
                        }} maxLength={50} minLength={5} type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Coatza 1" required />
                </div>
                <div className="mb-5">

                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Latitud:</label>
                    <input value={latitude} onChange={(e) => setLatitude(e.target.value)} maxLength={100} minLength={6} type="text" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='-94.910466' />

                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Longitud:</label>
                    <input value={longitude} onChange={(e) => setLongitude(e.target.value)} maxLength={100} minLength={6} type="text" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='17.952708' />
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{message}</button>
            </form>
        </Overlay>
    )

}

export default FormularioPuntos