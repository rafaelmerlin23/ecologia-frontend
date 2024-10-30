import { motion,AnimatePresence } from 'framer-motion'

function LabelEditorButton({handleRatingChange,handleSelect,tag,index}) {
  
  return (
    <div className=" flex justify-center items-center flex-col" key={index}>
        <button
            onClick={(e) => handleSelect(e, tag)}
            className={`z-30 w-[330px] w-full px-4 ${
              !tag.isSelect && tag.oldRating !== undefined && tag.ratingID !== undefined?
              "bg-red-800"
              :tag.isSelect 
              ? "bg-green-700" 
              :
               "bg-gray-700"
               
            } rounded-full border border-gray-600 hover:brightness-75`}
            key={tag.idTag * 3}>
            {tag.name}
        </button>
        <AnimatePresence>
            {tag.isSelect ? (
                <motion.div 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }}  
                    exit={{ opacity: 0, y: -20 }} // Cambié -20 a 20 para que se mueva hacia abajo al desaparecer
                    transition={{ duration: 0.05 }}  
                    className="z-10 flex items-center justify-center flex-col"
                >
                    <p>Selecciona la calificación de la etiqueta: <span className="text-sky-300">{tag.rating}</span></p>
                    <input
                        onChange={(e) => handleRatingChange(e, index)}
                        value={tag.rating}
                        type="range"
                        step="0.50"
                        max={3}
                        min={0}
                    />
                </motion.div>
            ) : null}
        </AnimatePresence>
    </div>
  )
}

export default LabelEditorButton