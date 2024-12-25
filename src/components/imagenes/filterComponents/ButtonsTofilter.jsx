import { faDownload, faFilter, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth } from '../../../AuthProvider'
import DownloadImages from '../../../helpers/DownloadImages'
import { useLocation } from 'react-router-dom'
import { useFilterImages } from '../../providers/FilterProvider'
import { useImages } from '../../providers/ImagesProvider'

export const ButtonsTofilter = ({ handelCloseModalFilter }) => {
  const {
    userData,
  } = useAuth()

  const {
    setFilter,
    filter,
    setDateRange,
    setGroupedTags,
    setRanges,
    setSelectedOrderFilter,
    setLocationToFilter,
    SetProjectToFilter,
    setAlbumsToFilter,
    setNotagsFilter,
  } = useFilterImages()

  const { maxPage, quantityImagePerPage, setPageImage } = useImages()

  const location = useLocation()
  const token = userData.token

  const onReset = () => {
    setDateRange({ initDate: '', endDate: '' })
    setNotagsFilter(false)
    setGroupedTags({})
    setRanges({ 0: false, 0.5: false, 1: false, 1.5: false, 2: false, 2.5: false, 3: false })
    setSelectedOrderFilter("None")
    SetProjectToFilter([])
    setLocationToFilter({})
    setAlbumsToFilter({})
    setFilter({ quantity: quantityImagePerPage })
    setPageImage(1)

  }

  const handleDowload = () => {
    const query = { ...filter, quantity: maxPage }
    console.log("consulta", query)
    DownloadImages(query, token)
  }


  return (
    <div className={`mb-0 col-span-4 flex sm:justify-center justify-center md:justify-center  gap-6 mt-6 ${location.pathname == "/imagenes" ? "xl:justify-end lg:justify-end" : "xl:justify-start lg:justify-start"}`}>
      <button
        type='button'
        onClick={onReset}
        className='gap-2 h-10 flex justify-center items-center text-1xl bg-amber-950  text-red-500 font-medium px-2 rounded-md hover:opacity-70 focus:opacity-50'>
        <FontAwesomeIcon className='text-sm' icon={faArrowsRotate} />
        Resetear
      </button>


      <button type='submit' className='h-10 gap-2 flex justify-center items-center text-1xl bg-blue-600 px-2 rounded-md hover:opacity-70 focus:opacity-50'>
        <FontAwesomeIcon className='text-sm' icon={faFilter} /> Filtrar
      </button>

      <button
        onClick={handleDowload}
        type='button' className='h-10 gap-2 flex justify-center items-center text-1xl bg-green-600 px-2 rounded-md hover:opacity-70 focus:opacity-50'>
        <FontAwesomeIcon
          className='text' icon={faDownload} />
        Descargar
      </button>
    </div>
  )
}

export default ButtonsTofilter