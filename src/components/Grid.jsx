import React from 'react'

function Grid({children}) {
  return (
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 bg-gradient-to-r from-gray-900 to-blue-gray-950 p-6'>
         {children}
      </div>
  )
}

export default Grid
