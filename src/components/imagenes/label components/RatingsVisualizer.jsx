import React, { useEffect, useState } from 'react'
import handleGetData from './../../../helpers/handleGetData'
import { useAuth } from '../../../AuthProvider'
function RatingsVisualizer({categorySelected}) {

  const {userData,image} = useAuth()
  const token = userData.token
  const [usersRatings,setUsersRatings] = useState([])
  const userID = userData.decoded.user_id

  useEffect(()=>{
    console.log("categoriaaa ",categorySelected)
    const getRatins = async() => {
      const endpointURL = `users/show_users`
      const dataUsers  = await handleGetData(endpointURL,token)
      const  users = dataUsers.response
      
      let newUsersRatings = [] 
      users.forEach( async(user) => {
        if(user[0] != userID  ){
          const ratings = await handleGetData(`ratings/show_ratings_from_user?picture_id=${image.id}&user_id=${user[0]}`, token)
          console.log(`ratings de ${user[1]}`,ratings)
        const newRatings = ratings.response.filter((Eachrating)=>(Eachrating[7] == categorySelected))
        newUsersRatings.push({
          user:{
            id:user[0],
            name:user[1],
            email:user[2]
          },
          ratings:newRatings
        })
        }
      })
      console.log("ratintitini: ",newUsersRatings)
      setUsersRatings(newUsersRatings)
    }
    if(categorySelected !== null){
      getRatins()
    }

  },[categorySelected])

  return (
    <>
    {usersRatings.map((userRating,index)=>(
      <section key={index}>
        {userRating.user.name}
        {userRating.ratings.map((rating,index)=>(
          <div className='' key={index}>
            <p>{rating[2]}</p>
            <p>{rating[3]}</p>
            <p>{rating[6]}</p>
          </div>
        ))
        }
      </section>
    ))}
    </>
  )
}

export default RatingsVisualizer