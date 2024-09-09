import { useState } from "react"
import Overlay from "../components/Overlay"
export const FormularioProyecto = ({ project = {
    index: '',
    name: '',
    description: '',
    date: ''
}, handle, message, closeCreateProject }) => {

    const handleDate = () => {
        if (project.index === '') {
            return ''
        } else {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            const day = project.date.slice(1, 3)
            const year = project.date.slice(8, 12)
            let datemonth = ''
            let i = 0
            for (let month of months) {
                if (project.date.slice(4, 7) === month) {
                    datemonth = i + 1 > 9 ? `${i + 1}` : `0${i + 1}`
                }
                i++
            }
            return `${year}-${datemonth}-${day}`
        }

    }

    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description)
    const [date, setDate] = useState(handleDate())



    return (
        <Overlay animacion={closeCreateProject}>
            <form onSubmit={(e) => handle(e, name, description, date)} className=" p-5 xl:w-80 lg:w-80 md:w-80 ">
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                    < input value={name} onChange={(e) => setName(e.target.value)} maxLength={50} minLength={5} type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Coatza 1" required />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripcion</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={100} minLength={10} type="text" id="password" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder='coatza 1 proyecto' />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha</label>
                    <input onChange={(e) => {
                        console.log(date)
                        setDate(e.target.value)
                    }} value={date} type="date" id="date" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{message}</button>
            </form>
        </Overlay>
    )
}

export default FormularioProyecto