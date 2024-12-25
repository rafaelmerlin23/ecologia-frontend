import React, { createContext, useState, useContext } from 'react';

const ImagesContext = createContext()

export const ImagesProvider = ({ children }) => {

    const [images, setImages] = useState([]) //funcionando
    const [image, setImage] = useState({}); //funcionando
    const [pageImage, setPageImage] = useState(1) //funcionando
    const [cardImagePage, setCardImagePage] = useState(1) //funcionando
    const quantityImagePerPage = 2 //funcionando
    const [isNextPage, setIsNextPage] = useState(true)
    const [loadingComplete, setLoadingComplete] = useState(false)
    const [imagesTodelete, setImagesToDelete] = useState([])
    const [maxPage, setMaxPage] = useState(1)
    const [files, setFiles] = useState([])
    const [imagesExist, setImagesExist] = useState(false)
    const [isUploading, setIsUploading] = useState(false)

    return (
        <ImagesContext.Provider value={{
            images,
            setImages,
            image,
            setImage,
            pageImage,
            setPageImage,
            cardImagePage,
            setCardImagePage,
            quantityImagePerPage,
            isNextPage,
            setIsNextPage,
            loadingComplete,
            setLoadingComplete,
            imagesTodelete,
            setImagesToDelete,
            setMaxPage,
            maxPage,
            files,
            setFiles,
            imagesExist,
            setImagesExist,
            isUploading,
            setIsUploading
        }}>
            {children}
        </ImagesContext.Provider>
    )
}

export const useImages = () => useContext(ImagesContext)