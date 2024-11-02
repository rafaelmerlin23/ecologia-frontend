import React from 'react'

function RatingCircle({state,colorActive,colorDesactive}) {
  return (
    <div className="relative h-6 w-6">
        {/* derecha */}
      <div className={`overflow-hidden absolute inset-0 rounded-full ${state === "complete"?colorActive:colorDesactive}`} >
        <div className="absolute top-0 left-0 h-full w-1/2"></div>
        {/* izquierda */}
        <div className={`absolute top-0 left-0 h-full  w-1/2 ${state === "half"?colorActive:state === "complete"?colorActive:colorDesactive}`}></div>
      </div>
      <div className="flex justify-center items-center absolute inset-0">
      </div>
    </div>
  )
}

export default RatingCircle