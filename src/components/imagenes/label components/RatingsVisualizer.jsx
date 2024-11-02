import React, { useEffect, useState } from 'react'
import handleGetData from '../../../helpers/handleGetData'
import { useAuth } from '../../../AuthProvider'
import handleDate, { handleDateTime } from '../../../helpers/formatDate'
import RatingVisualizer from './RatingVisualizer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faBan } from "@fortawesome/free-solid-svg-icons"

function RatingsVisualizer({categoryId,componentToRender}) {

  const {userData,image,shouldRefreshRatings} = useAuth()
  const token = userData.token
  const [usersRatings,setUsersRatings] = useState([])
  const userID = userData.decoded.user_id
  const userName = userData.userName


  useEffect(()=>{
    const getRatins = async() => {
        console.log(image.id)
        const ratings = await handleGetData(`ratings/show_ratings_from_picture?picture_id=${image.id}`, token)
        const newRatigs = ratings.response.filter((rating)=>rating[8] == categoryId)
        console.log("ratings antiguos: ",ratings)
        console.log("ratings filtrados: ",newRatigs)
        const groupedData = newRatigs.reduce((acc, item) => {
          const key = item[7]; // El primer elemento de cada sub-arreglo
          if (!acc[key]) {
            acc[key] = []; // Si no existe el grupo, lo inicializamos como un arreglo vacío
          }
          acc[key].push(item); // Agregamos el sub-arreglo al grupo correspondiente
          return acc;
        }, {});
        console.log("group data: ",groupedData)
        setUsersRatings(groupedData)
      } 

    getRatins()
  },[image.id,componentToRender,shouldRefreshRatings])

  return (
    <div>
      {Object.keys(usersRatings).length!==0? 
    Object.entries(usersRatings).map(([user, ratingsArray]) => (
      <div key={user} 
      className=" p-2 flex justify-center items-center flex-col gap-x-3 gap-y-3 mb-3">
        <label
        className=' font-bold'
        > {user === userName?"Tú":user}:</label>
        <ul>
          {ratingsArray.map((rating, index) => (
            <li key={index} className="">
                <RatingVisualizer rating={rating}/>       
            </li>
        
        
          ))}
        </ul>
      </div>
    )) 
      :<div className='mt-5 flex justify-center items-center flex-col gap-y-3'>
        <p className='text-yellow-200 text-center '>Sin ratings</p>
        <FontAwesomeIcon className='text-red-500 text-center text-5xl' icon={faBan}/>
        </div>}
  </div>
  )
}

export default RatingsVisualizer