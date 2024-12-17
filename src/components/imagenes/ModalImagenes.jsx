import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from '../../AuthProvider';
import prefixUrl from '../../helpers/ip';
import { useEffect, useState } from 'react';

function ModalImagenes({ closeModal, children }) {
  const { files, userData, albumInformation, refreshProjects, setFiles } = useAuth()
  const token = userData.token
  const [status, setStatus] = useState('0 imagenes subidas')
  const [isUploading, setIsUploading] = useState(false)


  const handleUploadPicture = async () => {
    if (!files || files.length === 0) {
      console.error("No se seleccionó ningún archivo");
      return;
    }
    setIsUploading(true)
    files.forEach(async (file, index) => {

      const dateString = file.date ? new Date() : new Date(file.lastModifiedDate);
      dateString.setMinutes(dateString.getMinutes() - dateString.getTimezoneOffset());
      const date = dateString.toISOString().slice(0, 10);


      const formData = new FormData();

      formData.append('file', file.file)

      formData.append('album_id', albumInformation.index);

      formData.append('category_id', 1)

      formData.append('date', date)

      await fetch(`${prefixUrl}pictures/upload_picture`, {
        method: 'POST',
        headers: {
          Authorization: token,
        },
        body: formData,
      }).then((res) => res.json())
        .then((data) => {
          console.log('Respuesta del servidor:', data);
          if (data && data.status == 'success') {
            console.log(data.reponse)
            setStatus(`${index + 1} imagenes subidas`)
            refreshProjects()
          }

        })
        .catch((error) => {
          console.error('Error:', error);
        });

    });
    setFiles([])
    setIsUploading(false)
    closeModal()
  }

  return (
    <div>
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-700 ">
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
            <div className='flex items-center justify-center flex-col gap-2'>
              {/* <label className='text-2xl'> fecha de las imagenes </label> */}
              {/* <input type="date"
                value={dateImages}
                onChange={(e) => setDateImages(e.target.value)}
                className='px-2 rounded-md bg-zinc-700 text-white text-2xl' /> */}
              {children}
            </div>
          </div>

          <div className="p-4 border-t flex justify-end gap-x-6">
            {isUploading ?
              <p className='text-2xl text-blue-200'>{status}</p>
              :
              (<>
                <button
                  onClick={handleUploadPicture}
                  className="px-4 py-2 bg-sky-800 text-white rounded flex justify-center items-center gap-x-2 hover:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={files.length === 0}
                >
                  <FontAwesomeIcon icon={faUpload} />
                  <p>Subir</p>
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:opacity-50"
                >
                  Cerrar
                </button>
              </>)
            }

          </div>
        </div>
      </div>

    </div>
  );
}

export default ModalImagenes;
