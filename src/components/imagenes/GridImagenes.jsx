import TarjetaImagen from "./TarjetaImagen"
import Etiquetador from './Etiquetador'
import { useSearchParams } from "react-router-dom"
import { useAuth } from "../../AuthProvider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload"
import { faExclamation, faTrash, faX } from "@fortawesome/free-solid-svg-icons"
import { handleDelete } from "../../helpers/handleDelete"
import { useState } from "react"
import Overlay from "../Overlay"
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useImages } from "../providers/ImagesProvider"
import { useTagger } from "../providers/TaggerProvider"


export const GridImagenes = ({ images }) => {
    const { refreshProjects, userData } = useAuth()

    const {
        isTaggerActive,
        setIsTaggerActive,
        setChanges
    } = useTagger()

    const { setImagesToDelete, imagesTodelete, setImage } = useImages()
    const [isModalDeleteActive, setIsModalDeletrActive] = useState(false)
    const token = userData.token


    async function downloadImagesAsZip(imageUrls) {
        const zip = new JSZip();
        const folder = zip.folder("images");

        for (const url of imageUrls) {
            try {
                const response = await fetch(url);
                const blob = await response.blob();
                const fileName = url.split("/").pop();
                folder.file(fileName, blob);
            } catch (error) {
                console.error(`Error al descargar la imagen ${url}:`, error);
            }
        }

        zip.generateAsync({ type: "blob" }).then((content) => {
            saveAs(content, "imagenes.zip");
        });
    }

    const openModalDelete = () => {
        setIsModalDeletrActive(true)
    }

    const closeModalDelete = () => {
        setIsModalDeletrActive(false)
    }

    const handlecloseTagger = () => {
        setChanges([])
        setImage({})
        setIsTaggerActive(false)
    }

    const handleCLoseImagesBar = () => {
        setImagesToDelete([])
    }

    const handleDeleteImages = () => {
        imagesTodelete.forEach(image => {
            const form = new FormData()
            form.append('picture_id', image.id)
            handleDelete("pictures/delete_picture", form, token, () => {
                console.log("se elimino")
            })

        });
        setImagesToDelete([])

    }
    const handleExitToModal = () => {

        setIsModalDeletrActive(false)
        refreshProjects()
    }

    return (
        <>
            <ModalDelete
                toDelete={imagesTodelete}
                onDelete={handleDeleteImages}
                isActive={isModalDeleteActive}
                onclose={closeModalDelete}
                toExit={handleExitToModal}
            />
            {imagesTodelete.length > 0 ?
                <div className="rounded-2xl mt-0 mb-0 flex gap-6  justify-start items-center bg-zinc-700 w-[74%] ">
                    <button onClick={handleCLoseImagesBar} className="ml-3 rounded-full px-3 py-2 hover:bg-zinc-600">
                        <FontAwesomeIcon icon={faX} />
                    </button>

                    <p>{imagesTodelete.length} selecionados</p>

                    <button
                        onClick={openModalDelete}
                        className="rounded-full px-3 py-2 hover:bg-zinc-600">
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                        onClick={() => downloadImagesAsZip(imagesTodelete.map((image) => image.url_original))}
                        className="rounded-full px-3 py-2 hover:bg-zinc-600">
                        <FontAwesomeIcon icon={faDownload} />
                    </button>
                </div> :
                <div className="my-5"></div>
            }
            <div className="p-4 grid grid-cols-2 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 gap-2 p-2">
                <Etiquetador handleClose={handlecloseTagger} isActive={isTaggerActive} />
                {images.map((image, index) => (
                    <div key={image.id} className="relative w-full h-48 bg-gray-300">
                        <TarjetaImagen index={index} image={image} />
                    </div>
                ))}
            </div>

        </>
    )

}

const ModalDelete = ({ toExit, onclose, isActive, onDelete, toDelete }) => {
    if (!isActive) return null
    return (
        <Overlay animacion={toDelete.length > 0 ? onclose : () => { }}>
            {toDelete.length > 0 ? <div className="mt-6 flex flex-col justify-center items-center">
                <label className="gap-2 flex flex-row text-2xl">
                    <FontAwesomeIcon className="mr-2 mb-4 bg-red-700 py-1 px-3 rounded-full" icon={faExclamation} />
                    <p> Eliminar imagenes selecionadas</p>
                </label>
                <button
                    onClick={onDelete}
                    className="text-2xl bg-red-500 px-4 rounded-2xl">Eliminar</button>
            </div> :
                <div className="mt-6 flex flex-col justify-center items-center">
                    <label className="gap-2 flex flex-row text-2xl">
                        <FontAwesomeIcon className="mr-2 mb-4 bg-red-700 py-1 px-3 rounded-full" icon={faExclamation} />
                        <p> Se eliminaron las imagenes</p>
                    </label>
                    <button
                        onClick={toExit}
                        className="text-2xl bg-red-500 px-4 rounded-2xl">Aceptar</button>
                </div>
            }
        </Overlay>
    )
}

export default GridImagenes