import React from 'react'
import Grid from '../Grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'

function EstructuraLoader() {
    const range = Array.from({ length: 8 }, (_, i) => i);
    return (
    <Grid>
        {range.map(item=>(
            <LoaderItem key={item}/>
        ))}
    </Grid>
  )
}

export default EstructuraLoader

const LoaderItem= ()=>{
    return(
        <div className='bg-gray-800  rounded-2xl'>
            <div className=" mt-0 aspect-[12/8] my-4 ">
                <div className="border-b-2 border-gray-600 h-48 min-h-[8rem] animate-pulse aspect-[16/9] flex items-center justify-center w-full h-full">
                    <FontAwesomeIcon className='text-9xl text-gray-700' icon={faFile}/>
                </div>
                <div className="gap-y-4 flex flex-col justify-between p-4 leading-normal md:text-lg">
                        <div className='flex flex-row gap-2  justify-center'>
                            <div className='rounded-full w-1/4 flex items-center justify-center h-6 bg-gray-700 animate-pulse'></div>
                            <div className='rounded-full w-1/4 flex items-center justify-center h-6  bg-gray-700 animate-pulse'></div>
                        </div> 
                        <div className='rounded-full w-full flex items-center justify-center h-6  bg-gray-700 animate-pulse'></div>
                        <div className='rounded-full w-full flex items-center justify-center h-6  bg-gray-700 animate-pulse'></div>
                </div>
            </div>
        </div>
    )
}