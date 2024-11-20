import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

function FilterImagesDate() {
    
    const [isGoodForm,setIsGoodForm]= useState(true)
    const [dateRange,setDateRange]= useState({initDate:'',endDate:''});
    const [isOpenFilterOverlays,setIsOPenFiltersOverlays] = useState({icp:false})

    const getDaysInMonth = (month, year) => {
        // `month` es de 1 a 12, por lo que restamos 1 para ajustarlo al índice (0 a 11)
        return new Date(year, month, 0).getDate();
      }
    
    const handleFilter= (e)=>{
        e.preventDefault()
        // if(initDate > finalDate){
        //     setIsGoodForm(false)
        //     return
        // }

        // console.log("dia inicial: ", initDate)
        // console.log("dia final: ", finalDate)

        // const endpointImages = `pictures/show_picture_from_album?album_id=${albumID}&start_date=${initDate}&end_date=${finalDate}`;
        // handleGetData(endpointImages, token).then((data) => {
        //     setImages(data.response);
        //     console.log("respuesta del servidor: ", data.response);
        //     setDateUbication(data.response.map((date) => date.total_pictures));
        // }).catch((error) => {
        //     console.error('Error al cargar las imágenes:', error);
        // });

        // setSearchParams((prev) => {
        //     prev.set('initial-date',initDate)
        //     prev.set('final-date',finalDate);
        //     return prev;
        // });

    }

    
    return (
    <>
        <form onSubmit={handleFilter} className=' mb-10 w-full flex justify-center items-center  gap-5 flex-col'>
            <div className='flex flex-col sm:flex-col gap-5'>
                <div className='flex flex-col xl:flex-row lg:flex-row gap-y-2 gap-5'>
                    
                    <div className='flex flex-col gap-y-2 items-center'>
                        <p className='text-2xl text-gray-400'>
                            Ordenar por
                        </p>
                        <select 
                        className='text-center px-2 w-[300px] h-[36px] rounded-md bg-zinc-700 text-white text-2xl'
                        name="" id="">
                            <option value="None"> Ninguno</option>
                            <option value="score asc">Score ascendente</option>
                            <option value="score desc">Score descendente</option>
                            <option value="fecha asc">Fecha ascendente</option>
                            <option value="fecha desc">Fecha descendente</option>
                            <option value=""></option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-y-2 items-center'>
                        <label
                        htmlFor='init-date'
                        className='text-2xl text-gray-400'>Fecha inicio</label>
                        <input
                        required
                        value={dateRange.initDate}
                        onChange={(e) => setDateRange((range)=>{
                            if(range.endDate === ''){
                                setIsGoodForm(true)
                                return {...range,initDate:e.target.value}
                            }
                            setIsGoodForm(new Date(`${e.target.value}-01`) <= new Date(`${dateRange.endDate}-01`))
                            return {...range,initDate:e.target.value}
                        })} 
                        id = "init-date"
                        type='month' 
                        className= {`${!isGoodForm?'border border-red-500':""}w-[300px] h-[36px] text-center px-2 rounded-md bg-zinc-700 text-white text-2xl`} />
                    </div>
                    <div className='flex flex-col gap-y-2 items-center'>
                        <label
                        htmlFor='end-date'
                        className='text-2xl text-gray-400'>Fecha final</label>
                        <input 
                        required
                        value={dateRange.endDate}
                        onChange={(e) => setDateRange((range)=>{
                            if(range.initDate === ''){
                                setIsGoodForm(true)
                                return {...range,endDate:e.target.value}
                            }
                            setIsGoodForm(new Date(`${e.target.value}-01`) >= new Date(`${dateRange.initDate}-01`))
                            return {...range,endDate:e.target.value}
                        })}
                        id = "end-date"
                        type='month' 
                        className= {`${!isGoodForm?'border border-red-500':""} w-[300px] h-[36px] text-center px-2 rounded-md bg-zinc-700 text-white text-2xl`} />
                    </div>
                    <div className='flex flex-col gap-y-2 items-center'>
                    <p
                    className='text-2xl text-gray-400'
                    >Etiquetas</p>
                        <div className='w-[300px] h-[36px] text-center px-2 rounded-md bg-zinc-700 text-white text-2xl '>
                            p
                        </div>
                    </div>
                </div>
                    <div className='flex flex-col gap-y-2 items-center'>
                    <p
                    className='text-2xl text-gray-400'
                    >Score</p>
                        <div className='w-[300px] h-[36px] text-center px-2 rounded-md bg-zinc-700 text-white text-2xl '>
                            p
                        </div>
                    </div>
                <div className='justify-end items-center flex flex-row gap-6'>
                <button 
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