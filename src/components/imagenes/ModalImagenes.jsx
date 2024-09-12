import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload} from "@fortawesome/free-solid-svg-icons"
function ModalImagenes({closeModal,children}) {

 
  return (
    <div>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 ">
          <div className="relative w-full h-full bg-gray-800">
            <div className="flex justify-between items-center p-4 border-b">
                <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
              <button
                onClick={closeModal}
                className=" text-3xl font-bold text-white hover:text-gray-500"
              >
                ×
              </button>
            </div>

            {/* Contenido con scroll */}
            <div className="h-[80vh] overflow-y-auto p-6">
                {children}
            </div>

            <div className="p-4 border-t flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      
    </div>
  );
}

export default ModalImagenes;
