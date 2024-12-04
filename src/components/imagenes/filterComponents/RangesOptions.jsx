import { useState } from "react"
import { useAuth } from "../../../AuthProvider"

export const RangesOptions = () => {

    const { ranges, setRanges, isActiveSelect, setIsActiveSelect } = useAuth()


    const onClick = (key, value) => {
        let newRanges = { ...ranges }
        newRanges[key] = !value
        setRanges(newRanges)
    }

    const onClickDisabled = () => {
        setIsActiveSelect((isActiveSelect => !isActiveSelect))
        setRanges({ 0: false, 0.5: false, 1: false, 1.5: false, 2: false, 2.5: false, 3: false })
    }

    return (
        <div className=' w-[310px] p-4   max-h-[20rem] overflow-y-auto bg-zinc-700 rounded-md '>

            <div className='font-bold flex gap-3 flex-col '>
                <button
                    type="button"
                    onClick={onClickDisabled}
                    className={`hover:brightness-200 hover:bg-transparent hover:border-4 hover:border-green-700 hover:text-green-500 text-sm justify-center flex items-center ${!isActiveSelect ? 'brightness-200 bg-transparent border-4 border-green-800 text-green-900' : ' border-4 border-zinc-800 bg-zinc-800'}`}
                >
                    No especificado
                </button>
                <div

                    className="flex flex-col grid grid-cols-3 gap-y-1">
                    {
                        Object.entries(ranges).map(([key, value]) => (
                            <button
                                type="button"
                                disabled={!isActiveSelect}
                                onClick={e => onClick(key, value)}
                                className={`disabled:opacity-40 text-sm justify-center flex items-center ${!isActiveSelect?"":"hover:brightness-200 hover:bg-transparent hover:border-4 hover:border-green-700 hover:text-green-500"} ${value ? 'brightness-200 bg-transparent border-4 border-green-800 text-green-900' : ' border-4 border-zinc-800 bg-zinc-800'}`}
                                key={key}>
                                {key}
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default RangesOptions