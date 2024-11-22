import { useEffect } from "react";

const FilterWrapper = ({ modalRef, isActive, position, children }) => {
    if (!isActive) return null;
    useEffect(()=>{
        console.log("coordenadas en el wrapper",position)
    },[])   
    return (
        <div
            ref={modalRef}
            className="absolute top-0 left-0 z-20 pointer-events-none"
        >
            <div
                className="absolute w-60 flex flex-col gap-2 items-start justify-center bg-gray-400 shadow-xl bg-zinc-700 rounded-md pointer-events-auto"
                style={{
                    position: 'absolute',
                    top: position.y,
                    left: position.x,
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default FilterWrapper;
