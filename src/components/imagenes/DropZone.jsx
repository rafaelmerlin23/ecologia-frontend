import React, { useState } from 'react'
import { useAuth } from '../../AuthProvider'

function DropZone({ }) {

  const { files, setFiles } = useAuth()
  const [isDrag, setIsDrag] = useState()

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDrag(false)
    handleChange(e.dataTransfer)  // Guardar los archivos
  }

  const handleDragLeave = (e) => {
    setIsDrag(false)
  }

  const handleDragOver = (e) => {
    setIsDrag(true)
    e.preventDefault();  // Permitir el drop
  }

  function handleChange(event) {

    const selectedFiles = Array.from(event.files || event.target.files)
    let combineFiles = selectedFiles

    if (files.length > 0) {
      const newFiles = []
      const oldFiles = files.map((file) => file.file)

      for (let selectedFile of selectedFiles) {
        const exists = oldFiles.some(
          (oldFile) => oldFile.name === selectedFile.name && selectedFile.size === oldFile.size
        )

        if (!exists) {
          newFiles.push(selectedFile)
        }
      }
      combineFiles = [...oldFiles, ...newFiles]


    }
    const imagePreviews = combineFiles.map((file) => ({
      url: URL.createObjectURL(file)
      , file: file
    }));
    setFiles(imagePreviews)

    console.log(imagePreviews)

  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className=" flex items-center justify-center w-full">

      <label
        className={isDrag ? "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-500 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-800 hover:bg-gray-100 dark:border-gray-500 saturate-150 " :
          "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 dark:hover:saturate-150"}>
        <div
          className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click para subir</span></p>
          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG </p>
        </div>
        <input
          onClick={(e) => e.target.value = null}
          onChange={(e) => handleChange(e)}
          multiple={true}
          id="dropzone-file"
          type="file"
          className="hidden"
          accept=".jpg, .jpeg, .png" />
      </label>
    </div>
  )
}

export default DropZone
