import React from 'react';
import RatingCircle from './RatingCircle';

const RatingFormat = ({ rating }) => {
  // Validar que el rating esté entre 0 y 3 y sea un múltiplo de 0.5
  const validRating = (rating <= 3 && rating >= 0) && rating % 0.5 ===0;
  const fullCirlces = Math.floor(rating)
  const isMiddleCircle = rating % 1 !== 0

  return (
    <div className='flex gap-3'>
      {validRating? [...Array(3)].map((_,index)=>{
        let state = ""
        
        if(index+1 <= fullCirlces){
          state ="complete"
        }
        if(index+1 === fullCirlces+1 && isMiddleCircle){
          state = "half"
        }
        return <RatingCircle key={index} state={state} colorActive={"bg-red-500"} colorDesactive={"bg-gray-200"}/>
      })
      :<p>ingresa un rating valido</p>}
    </div>
  );
};

export default RatingFormat;
