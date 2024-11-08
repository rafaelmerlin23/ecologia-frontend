const MONTHS = {
    1: "Enero",
    2: "Febrero",
    3: "Marzo",
    4: "Abril",
    5: "Mayo",
    6: "Junio",
    7: "Julio",
    8: "Agosto",
    9: "Septiembre",
    10: "Octubre",
    11: "Noviembre",
    12: "Diciembre",
  }

import React, { useEffect, useState } from 'react'
import GridGroupImages from './GridGroupImages'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

function MonthImagesGroup({group}) {
    // link: response[0],
  //           id: response[1],
  //           date: response[2],
  useEffect(()=>{
    if(group!== undefined){
        console.log(group)
    }
},[])

  return (
    <div  className='mb-4'>
        <div className='flex justify-center items-center gap-3 mb-4 '>
          <FontAwesomeIcon className='text-2xl text-gray-200' icon={faCalendar}/>

        <p
        className='text-center text-2xl text-gray-400  ' 
        >{`${MONTHS[Number(group.date.slice(5,7))]}, ${group.date.slice(0,4)}`}</p>
        </div>
        <hr />
        <GridGroupImages
        month= {`${group.date.slice(5,7)}-${group.date.slice(0,4)}`}
        totalIMages={group.total_pictures}
        images={
            group.pictures.map((picture)=>(
                {
                    link:picture.url,
                    id:picture.picture_id,
                    date:picture.date
                }
            ))}/>
    </div>
  )
}

export default MonthImagesGroup