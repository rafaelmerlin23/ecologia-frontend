import { useEffect, useState } from "react"
import { useAuth } from "../../AuthProvider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useSearchParams } from "react-router-dom"

export const Paginacion = ({ handleNext, handlePrevious, maxPage }) => {
    const [hasNext, setHasNext] = useState(true)

    const { pageImage, setPageImage } = useAuth()
    const [searchParams, setSearchParams] = useSearchParams()
    const bottonClassName = "px-4 rounded-1xl hover:bg-gray-800 "
    const arrowsButtonStyle = "flex justify-center items-center hover:bg-gray-800 disabled:hover:bg-transparent px-2 disabled:opacity-50 "

    useEffect(() => {
        if (pageImage >= maxPage) {
            setHasNext(false)
        } else {
            setHasNext(true)
        }
    }, [])

    const handlePageImage = (newPage) => {
        // setSearchParams(params => {
        //     params.set("page", newPage);
        //     return params;
        // });
        setPageImage(newPage)

    }

    const handleSubmit = (e, newPage) => {
        e.preventDefault()
        handlePageImage(newPage)
    }


    return (
        <div className="mb-10">
            {maxPage !== 1 ? <div className="flex gap-2">
                <button
                    className={arrowsButtonStyle}
                    disabled={!(pageImage != 1)}
                    onClick={handlePrevious}>
                    <FontAwesomeIcon
                        className="text-2xl"
                        icon={faArrowLeft} />
                </button>
                {
                    maxPage > 2 ?
                        <div>
                            {maxPage > 4 && pageImage - 2 > 0 ?
                                <div className="flex gap-1 text-2xl">
                                    <button
                                        className={bottonClassName}
                                        onClick={() => handlePageImage(1)}
                                    >{1}</button>
                                    {maxPage !== 5 ? <InputButton handleSubmit={handleSubmit} /> : ""}

                                    <button
                                        className={bottonClassName}
                                        onClick={() => handlePageImage(pageImage - 2)}
                                    >{pageImage - 2}</button>
                                    <button
                                        className={bottonClassName}
                                        onClick={() => handlePageImage(pageImage - 1)}
                                    >{pageImage - 1}</button>

                                    {maxPage !== pageImage ? <button className={`${bottonClassName} bg-green-600`}>{pageImage}</button> : ""}
                                    {pageImage + 1 < maxPage ? <button
                                        className={bottonClassName}
                                        onClick={() => handlePageImage(pageImage + 1)}
                                    >{pageImage + 1}</button> : ""}
                                    {pageImage + 2 < maxPage ? <button
                                        className={bottonClassName}
                                        onClick={() => handlePageImage(pageImage + 2)}
                                    >{pageImage + 2}</button> : ""}
                                    {pageImage + 3 !== maxPage && pageImage + 2 !== maxPage && pageImage + 1 !== maxPage && pageImage !== maxPage ?
                                        <InputButton handleSubmit={handleSubmit} /> : ""}
                                    {maxPage === pageImage ?
                                        <button
                                            className={`${bottonClassName} bg-green-600`}
                                            onClick={() => handlePageImage(maxPage)}
                                        >{maxPage}</button> :
                                        <button
                                            className={bottonClassName}
                                            onClick={() => handlePageImage(maxPage)}
                                        >{maxPage}</button>}
                                </div>
                                :
                                <div className="flex gap-1 text-2xl">
                                    {pageImage === 1 ? <button
                                        className={`${bottonClassName} bg-green-600`}
                                    >1</button> : <button
                                        className={bottonClassName}
                                        onClick={() => handlePageImage(1)}
                                    >1</button>}
                                    {pageImage === 2 ? <button
                                        className={`${bottonClassName} bg-green-600`}
                                    >2</button> : <button
                                        className={bottonClassName}
                                        onClick={() => handlePageImage(2)}
                                    >2</button>}
                                    {pageImage === 3 ? <button
                                        className={`${bottonClassName} bg-green-600`}
                                    >3</button> : <button
                                        className={bottonClassName}
                                        onClick={() => handlePageImage(3)}
                                    >3</button>}
                                    {maxPage > 3 ? <div>
                                        {pageImage === 4 ? <button
                                            className={`${bottonClassName} bg-green-600`}
                                        >4</button> : <button
                                            className={bottonClassName}
                                            onClick={() => handlePageImage(4)}
                                        >4</button>}


                                    </div> : ""}
                                    {maxPage > 4 ? <InputButton handleSubmit={handleSubmit} /> : ""}
                                    {maxPage > 4 ? <button
                                        className={bottonClassName}
                                        onClick={() => handlePageImage(maxPage)}
                                    >{maxPage}</button> : ""}
                                </div>}
                        </div>
                        : <div className="flex gap-2">
                            {pageImage === 1 ? <button
                                className={`${bottonClassName} bg-green-600`}
                            >1</button> : <button
                                className={bottonClassName}
                                onClick={() => handlePageImage(1)}
                            >1</button>}
                            {pageImage === 2 ? <button
                                className={`${bottonClassName} bg-green-600`}
                            >2</button> : <button
                                className={bottonClassName}
                                onClick={() => handlePageImage(2)}
                            >2</button>}

                        </div>
                }
                <button
                    className={arrowsButtonStyle}
                    disabled={!hasNext}
                    onClick={handleNext}>
                    <FontAwesomeIcon
                        className="text-2xl"
                        icon={faArrowRight} />
                </button>
            </div> : ""}
        </div>
    )
}


const InputButton = ({ handleSubmit }) => {
    const [isActive, setIsActive] = useState(false)
    const [newPage, setNewPage] = useState('')
    return (
        <div className="px-2 hover:bg-gray-800 rounded-1xl">
            {!isActive ? <button
                onClick={() => setIsActive(true)}
            >...</button> : ""}
            {isActive ? <form onSubmit={(e) => handleSubmit(e, newPage)}> <input
                value={newPage}
                onBlur={() => setIsActive(false)}
                onChange={(e) => setNewPage(e.target.value)}
                className="w-8 text-white text-2xl bg-transparent "
                type="text" /></form> : ""}
        </div>
    )
}

export default Paginacion