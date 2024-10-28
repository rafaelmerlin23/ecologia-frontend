import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown} from "@fortawesome/free-solid-svg-icons"
import LabelEditorButton from './LabelEditorButton';

function TagsSelector({handleTags,categories,handleSelect,tags,handleClick,handleRatingChange}) {
  return (
    <div className="flex-col  lg:self-start xl:self-start sm:flex sm:flex sm:justify-center sm-items-center sm:flex w-[340px]">
                            <select onChange={(e) => handleTags(e.target.value)} about="hola" className="text-gray-700">
                                {categories.map((category) => (
                                    <option value={category.id} className="text-gray-700" key={category.id * 10}>
                                        {category.field}
                                    </option>
                                ))}
                            </select>
                            <div className="pt-4 flex flex-col gap-y-2 ">
                                {tags.length > 0 ? tags.map((tag, index) => (
                                    <LabelEditorButton key={index} handleRatingChange={handleRatingChange} handleSelect={handleSelect} tag={tag} index = {index}/>                                )) :
                                    <div className=" flex justify-center items-center flex-col">
                                        <p>Categoria sin etiquetas.</p>
                                        <p>Crea una</p>
                                        <FontAwesomeIcon className='pb-1 text-green-600' icon={faArrowDown} />
                                        <button onClick={handleClick} className="rounded-full bg-blue-700 px-6">Crear</button>
                                    </div>}
                            </div>
                        </div>
  )
}

export default TagsSelector