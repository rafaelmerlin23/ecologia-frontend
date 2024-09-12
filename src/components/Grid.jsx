import React from 'react'

function Grid({children}) {

 
  const classText = ` xl:grid xl:grid-cols-4 lg:flex md:flex-wrap  lg:gap-6 lg:flex md:flex md:flex-wrap  md:gap-6 sm:flex sm:flex-wrap  sm:gap-6 justify-center  bg-transparent p-6`
  return (
      <div className={classText}>
         {children}

      </div>
  )
}

export default Grid
