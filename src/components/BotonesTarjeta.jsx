import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"

export const BotonesTarjeta = ({ openEdit, openDelete }) => {

    return (
        <div className='flex items-center justify-center space-x-2 pt-6'>
            <button
                onClick={(e) => openEdit(e)}>
                <FontAwesomeIcon className='hover:text-gray-300 text-2xl bg-gray-950 p-2 pl-6 pr-6 rounded-2xl' icon={faPen} />
            </button>
            <button
                className=''
                onClick={(e) => openDelete(e)}>
                <FontAwesomeIcon className='hover:text-gray-300 text-2xl bg-red-800 p-2 pr-6 pl-6 rounded-2xl' icon={faTrash} />
            </button>
        </div>
    )
}


export default BotonesTarjeta