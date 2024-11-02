import React from 'react'
import RatingFormat from './RatingFormat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCalendar } from "@fortawesome/free-solid-svg-icons"
import { handleDateTime } from '../../../helpers/formatDate'

function RatingVisualizer({rating}) {
  return (
    <div className='flex justify-center items-center flex-col gap-3 mb-2'>
      <div 
      className='flex justify-center items-center flex-col gap-3'>
        <p className='text-blue-200'>{rating[6]}</p>
        <div className='flex justify-center items-center flex-row gap-2'>
        <FontAwesomeIcon icon={faCalendar}/>
        <p>{handleDateTime(rating[3])}</p>        
        </div>
      </div>
      <RatingFormat rating={rating[2]} ></RatingFormat>
    </div>
  )
}

export default RatingVisualizer