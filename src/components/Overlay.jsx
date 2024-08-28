import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from "@fortawesome/free-solid-svg-icons"

const OverlayElminar =({children}) => {
  
  return (
    <>
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='bg-gray-700 p-5 rounded flex flex-col justify-center items-center gap-5'>
              {children}
            </div>
        </div>

    </>
  )
}


export default OverlayElminar