import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'

function EstructuraLoader() {
    const range = Array.from({ length: 5 }, (_, i) => i);
    return (
        <div className="w-screen">

            <div
                className="sm:grid md:grid lg:grid xl:grid w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-10 p-6">
                {range.map(item => (
                    <LoaderItem key={item} />
                ))}
            </div>

        </div>
    );
}
export default EstructuraLoader

const LoaderItem = () => {
    return (
        <div className='bg-gray-800  rounded-2xl'>
            <div className=" mt-0 aspect-[12/8] my-4 ">
                <div className="border-b-2 border-gray-600 h-48 min-h-[8rem] animate-pulse aspect-[16/9] flex items-center justify-center w-full h-full">
                    <FontAwesomeIcon className='text-9xl text-gray-700' icon={faFile} />
                </div>
                <div className="gap-y-6 flex flex-col justify-between p-4 leading-normal md:text-lg">
                    <div className='flex flex-row gap-4  justify-center'>
                        <div className='rounded-full w-1/4 flex items-center justify-center h-12 bg-gray-700 animate-pulse'></div>
                        <div className='rounded-full w-1/4 flex items-center justify-center h-12  bg-gray-700 animate-pulse'></div>
                    </div>
                    <div className='rounded-full w-full flex items-center justify-center h-8  bg-gray-700 animate-pulse'></div>
                    <div className='rounded-full w-full flex items-center justify-center h-8  bg-gray-700 animate-pulse'></div>
                </div>
            </div>
        </div>
    )
}