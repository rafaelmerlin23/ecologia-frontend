import React, { useEffect } from 'react'

function Grid({ children }) {
  

  const classText = `sm:grid md:grid lg:grid xl:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-10 p-6`
  return (
    <div 
    id='div-grid'
    className={classText}>
      {children}

    </div>
  )
}

export default Grid
