import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan,faCheck } from "@fortawesome/free-solid-svg-icons"
import { motion,AnimatePresence } from 'framer-motion';
import handleCreate from '../../../helpers/handleCreate';
import { useAuth } from '../../../AuthProvider';
import prefixUrl from '../../../helpers/ip';
import handleUpdate from '../../../helpers/handleUpdate';
function LabelImage({image,changes,handleOpenModal}) {
  
  const {userData,refreshProjects,setChanges} = useAuth()
  const userID = userData.decoded.user_id
  const token = userData.token

  const handleChanges = (event)=>{
    event.stopPropagation()
    console.log("hola")
    for(let change of changes){
      switch (change.type) {
        case "create":
            handleCreateLabel(change)
            console.log("se creo")
          break;
        case "update":

          break;
        default:
          "nadota"
          break;
      }
    }
  }

  const deleteChange = (change)=>{
    let newChanges = []
    changes.forEach(eachChange => {
      if(eachChange.idTag !== change.idTag){
          newChanges.push(eachChange)
      }
    });
    setChanges(newChanges)
  }


  const handleCreateLabel = (change)=>{
    const data = new FormData()
    const endPointUrl = `${prefixUrl}miscellaneous/create_rating`
    
    data.append('picture_id',image.id)
    data.append('user_id',userID)
    data.append('tag_id',change.idTag)
    data.append('rating_score',change.rating)

    handleCreate(endPointUrl,token,data,()=>{
        refreshProjects()
        deleteChange(change)
    })
  }

  const handleDeleteLabel = (change) =>{
    
  }


  // picture_id = request.form.get('picture_id', type=str)
  // user_id = request.form.get('user_id', type=int)
  // rating_score = request.form.get('rating_score', type=int)
  // rating_date = request.form.get('rating_date', type=int)

  const handleUpdateLabel = (change)=>{
    const data = new FormData()
    data.append('picture_id',image.id)
    data.append('user_id',userID)
    data.append('tag_id',change.idTag)
    data.append('rating_score',change.rating)

    const endPointUrl = `${prefixUrl}miscellaneous/update_rating`
    handleUpdate(endPointUrl,token,)
  }

  return (
    <div onClick={handleOpenModal} className="relative w-3/5 h-60 min-h-[30-rem] xl:min-h-[40rem] bg-gray-200 flex items-center justify-center hover:cursor-pointer">
          {image.link ? (
              <img className="object-cover w-full h-full" src={image.link} alt="sin" />
          ) : (
              <p className="text-gray-500">No Image Available</p>
          )}
            <AnimatePresence>
          {changes.length > 0 ? (
          <motion.button
              onClick={(e) => handleChanges(e)}
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