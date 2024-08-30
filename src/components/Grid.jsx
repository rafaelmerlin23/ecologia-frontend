import React from 'react'

function Grid({children,gridInfraestructura}) {

 
  const classText = `grid grid-cols-1 sm:grid-cols-${gridInfraestructura.sm} md:grid-cols-${gridInfraestructura.md} lg:grid-cols-${gridInfraestructura.lg} xl:grid-cols-${gridInfraestructura.xl} gap-6 bg-gradient-to-r from-gray-900 to-blue-gray-950 p-6`
  return (
      <div className={classText}>
         {children}
      </div>
  )
}

export default Grid
