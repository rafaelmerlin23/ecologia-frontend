import React from 'react'

function Grid({children}) {

 
  const classText = `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6 bg-gradient-to-r from-gray-900 to-blue-gray-950 p-6`
  return (
      <div className={classText}>
         {children}
      </div>
  )
}

export default Grid
