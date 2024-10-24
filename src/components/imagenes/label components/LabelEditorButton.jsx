import React from 'react'

function LabelEditorButton({handleRatingChange,handleSelect,tag,index}) {
  return (
    <div className=" flex justify-center items-center flex-col" key={index}>
        <button
            onClick={(e) => handleSelect(e, tag)}
            className={`w-[330px] w-full px-4 ${tag.isSelect ? "bg-green-700" : "bg-gray-700"} rounded-full border border-gray-600 hover:brightness-75`}
            key={tag.idTag * 3}>
            {tag.name}
        </button>
        {tag.isSelect ?
            <div className="flex items-center justify-center flex-col">
                <p >Selecciona la calificacion de la etiqueta:  <span className="text-sky-300">{tag.rating}</span></p>
                <input
                    onChange={(e) => handleRatingChange(e, index)}
                    value={tag.rating}
                    type="range"
                    step="0.50"
                    max={3}
                    min={0}
                />
            </div>
            : ""}
    </div>
  )
}

export default LabelEditorButton