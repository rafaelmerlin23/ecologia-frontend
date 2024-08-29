import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from "@fortawesome/free-solid-svg-icons"

const OverlayElminar =({children}) => {
  
  return (
    <>
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center mb-0 mt-0'>
      <div className='relative bg-gray-700 px-5 pb-5 pt-5 rounded flex flex-col justify-center items-center gap-5 mb-0 mt-0'>
        {/* Botón para cerrar */}
        <button className='absolute top-2 left-2 text-white text-xl '>
          &times;
        </button>
        {children}
      </div>
    </div>

    </>
  )
}


export default OverlayElminar