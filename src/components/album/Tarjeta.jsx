import React from 'react'
import folderImage from '../../../src/assets/folder-solid.svg'
function Tarjeta() {
  return (
    <>
       <div
      style={{
        backgroundImage: `url(${folderImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover', // O 'contain' si prefieres ajustar la imagen sin recorte
        width: '200px',
        height: '200px',
        border: '1px solid gray',
        color: 'white', // Para que el texto sea visible sobre el fondo
      }}
    >
      <p>Hola</p>
    </div>

    </>
  )
}

export default Tarjeta
