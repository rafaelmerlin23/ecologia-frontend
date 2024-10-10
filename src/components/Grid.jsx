import React, { useEffect, useState, useRef } from 'react';

function Grid({ children }) {
  const baseClass =  `sm:grid md:grid lg:grid xl:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-10 p-6`;
  const [classText, setClassText] = useState(baseClass);
  const gridRef = useRef(null);  // Usamos un ref para referenciar el div
  
  useEffect(() => {
    if (gridRef.current) {  // Aseguramos que el ref esté montado
      const numElementos = gridRef.current.childElementCount; 
      if(numElementos <5){
        let gridColsClass = '';
        if (numElementos === 1) gridColsClass = 'grid-cols-1 w-[500px]';
        else if (numElementos === 2) gridColsClass = 'w-[1000px] xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1';
        else if (numElementos === 3) gridColsClass = 'w-[1500px] xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1';
        else if (numElementos === 4) gridColsClass = 'xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ';
        else gridColsClass = `grid-cols-${numElementos > 4 ? 5 : numElementos}`;

        setClassText(`grid ${gridColsClass} gap-4 px-8`);
      }
    }
  }, [children]);  // Actualiza el cálculo cuando cambien los children

  return (
    <div className='flex items-center justify-center'>
    <div 
      id='div-grid'
      ref={gridRef}  // Asignamos el ref al div
      className={classText}>
        {children}
    </div>
    </div>
  );
}

export default Grid;
