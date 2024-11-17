import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

function FilterImagesDate({SetEndDate,endDate,handleFilter,handleReset,initialDate,isGoodForm,setInitialDate,setIsGoodForm}) {

    
    return (
    <>
        <form onSubmit={handleFilter} className='mb-10 w-full flex justify-center items-center  gap-5 flex-col'>
            <div className='flex flex-col sm:flex-col gap-5'>
                <div className='flex flex-col xl:flex-row lg:flex-row gap-y-2 gap-5'>
                    <div className='flex flex-col gap-y-2 items-center'>
                        <label
                        htmlFor='init-date'
                        className='text-2xl text-gray-400'>Inicio</label>
                        <input
                        required
                        value={initialDate}
                        onChange={(e) => setInitialDate((initial)=>{
                            if(endDate === ''){
                                setIsGoodForm(true)
                                return e.target.value
                            }
                            setIsGoodForm(new Date(`${e.target.value}-01`) <= new Date(`${endDate}-01`))
                            return e.target.value
                        })} 
                        id = "init-date"
                        type='month' 
                        className= {`${!isGoodForm?'border border-red-500':""} text-center px-2 rounded-md bg-zinc-700 text-white text-2xl`} />
                    </div>
                    <div className='flex flex-col gap-y-2 items-center'>
                        <label
                        htmlFor='end-date'
                        className='text-2xl text-gray-400'>Final</label>
                        <input 
                        required
                        value={endDate}
                        onChange={(e) => SetEndDate(end=>{
                            if(initialDate === ''){
                                setIsGoodForm(true)
                                return e.target.value
                            }
                            setIsGoodForm(new Date(`${initialDate}-01`) <= new Date(`${e.target.value}-01`))
                            return e.target.value
                        })}
                        id = "end-date"
                        type='month' 
                        className= {`${!isGoodForm?'border border-red-500':""} text-center px-2 rounded-md bg-zinc-700 text-white text-2xl`} />
                    </div>
                </div>
                <div className='justify-end items-center flex flex-row gap-6'>
                <button 
                    onClick={e=>handleReset(e)}
                    className='h-10 flex justify-center items-center text-1xl bg-amber-950  text-red-500 font-medium px-2 rounded-md hover:opacity-70 focus:opacity-50'>
                    Resetear
                </button>
                            
                    <button type='submit' className='h-10 gap-2 flex justify-center items-center text-1xl bg-blue-600 px-2 rounded-md hover:opacity-70 focus:opacity-50'> 
                        <FontAwesomeIcon className='text-sm' icon={faFilter}/> Filtrar
                        </button>
                </div>
            </div>
            {!isGoodForm?<p className='text-1xl text-red-500'>El inicio no puede ser mayor al final</p>:""}
        </form>

    </>
  )
}

export default FilterImagesDate