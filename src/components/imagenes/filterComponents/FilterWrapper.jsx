const FilterWrapper = ({modalRef,isActive,position,children})=>{
    if(!isActive) return null
    return (
            <div
            ref={modalRef}
            className="z-40">
                <div
                className={`md:flex sm:flex w-60 flex-col gap-2 flex items-start justify-center  bg-gray-400   shadow-xl border border-gray-500 rounded-lg z-50 `}
                style={{
                    top: position.y, // 10px debajo del botón
                    left: position.x-10,
                }}
                >
                   {children}
                    
                </div>
            </div>
      );
    
}


export default FilterWrapper