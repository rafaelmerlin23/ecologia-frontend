import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan,faCheck } from "@fortawesome/free-solid-svg-icons"
import { motion,AnimatePresence } from 'framer-motion';

function LabelImage({image,changes,handleOpenModal}) {
  return (
    <div onClick={handleOpenModal} className="relative w-3/5 h-60 min-h-[30rem] bg-gray-200 flex items-center justify-center hover:cursor-pointer">
          {image.link ? (
              <img className="object-cover w-full h-full" src={image.link} alt="sin" />
          ) : (
              <p className="text-gray-500">No Image Available</p>
          )}
            <AnimatePresence>
          {changes.length > 0 ? (
          <motion.button
              onClick={(e) => onLabel(e)}
              title="guardar cambios"
              className="active:brightness-150 hover:brightness-110 click:brightness-150 px-3 py-2 absolute top-1/2 right-[-10px] transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.1 }}
          >
              <label>
              guardar <FontAwesomeIcon icon={faGreaterThan} />
              </label>
          </motion.button>
          ) : (
          <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.1 }}
              className="bg-green-500 px-3 py-2 rounded-full absolute top-1/2 right-[-15px] transform -translate-x-1/2 -translate-y-1/2"
          >
              <label
              onClick={(e) => e.stopPropagation()}
              title="sin cambios"
          
              >
              <FontAwesomeIcon className="text-white" icon={faCheck} />
              </label>
          </motion.div>
          )}
      </AnimatePresence>
    </div>
  )
}

export default LabelImage