import { useEffect } from "react";
export const ModalFilters = ({ isActive, onClose }) => {
    useEffect(() => {
        if (isActive) {
            document.body.style.overflow = 'hidden'; // Oculta el scroll
        } else {
            document.body.style.overflow = ''; // Restaura el scroll
        }

        // Limpieza al desmontar el componente
        return () => {
            document.body.style.overflow = '';
        };
    }, [isActive]);

    if (!isActive) return null;
    return (
        <div
            className='xl:hidden lg:hidden z-40 fixed inset-0 bg-gray-800'>
            <div className="flex flex-row items-center justify-between">
                <p className="text-4xl">Filtros</p>
                <button
                    onClick={onClose}
                    className="text-center flex items-center justify-center py-1 text-4xl mr-2 rounded-full px-4 hover:bg-gray-700">x</button>
            </div>
        </div>
    )
}

export default ModalFilters 