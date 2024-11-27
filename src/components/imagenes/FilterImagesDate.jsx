import FilterGrouped from "./filterComponents/FiltersGrouped"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import ModalFilters from "./filterComponents/ModalFilters";

function FilterImagesDate() {
    const [isModalFilterActive, setIsModalFilterActive] = useState(false)

    const handelCloseModalFilter = () => {
        setIsModalFilterActive(false)
    }

    const handelOpenModalFilter = () => {
        setIsModalFilterActive(true)
    }

    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <form onSubmit={onSubmit} className='xl:flex lg:flex hidden md:hidden sm:hidden mb-10 w-full flex-col'>
                <div className='grid grid-cols-4 gap-4'>
                    <FilterGrouped />
                    <div className='col-span-4 flex justify-end gap-6'>
                        <button
                            className='h-10 flex justify-center items-center text-1xl bg-amber-950  text-red-500 font-medium px-2 rounded-md hover:opacity-70 focus:opacity-50'>
                            Resetear
                        </button>

                        <button type='submit' className='h-10 gap-2 flex justify-center items-center text-1xl bg-blue-600 px-2 rounded-md hover:opacity-70 focus:opacity-50'>
                            <FontAwesomeIcon className='text-sm' icon={faFilter} /> Filtrar
                        </button>
                    </div>
                </div>

            </form>
            <ModalFilters isActive={isModalFilterActive} onClose={handelCloseModalFilter} />
            <button
                onClick={handelOpenModalFilter}
                className='xl:hidden lg:hidden md:flex  sm:flex flex h-10 gap-2 justify-center items-center text-1xl bg-zinc-700 px-2 rounded-md hover:opacity-70 focus:opacity-50'>
                <FontAwesomeIcon className='text-sm' icon={faFilter} /> Abrir filtros
            </button>
        </>
    )
}

export default FilterImagesDate