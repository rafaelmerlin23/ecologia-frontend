import { useEffect } from "react";
import FilterGrouped from "./FiltersGrouped";
import ButtonsTofilter from "./ButtonsTofilter";

export const ModalFilters = ({ isActive, onClose }) => {
    useEffect(() => {
        if (isActive) {
            // Oculta el scroll al activar el modal
            document.body.style.overflow = 'hidden';
        } else {
            // Restaura el scroll al desactivar el modal
            document.body.style.overflow = '';
        }

        // Función para manejar el cambio de tamaño de la ventana
        const handleResize = () => {
            if (window.innerWidth > 640 && isActive) {
                onClose(); // Cierra el modal si el ancho supera los 640px
            }
        };

        // Agrega el event listener
        window.addEventListener('resize', handleResize);

        // Limpieza al desmontar el componente o cambiar `isActive`
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('resize', handleResize);
        };
    }, [isActive, onClose]);

    if (!isActive) return null;

    return (
        <div className="xl:hidden md:hidden lg:hidden z-40 fixed inset-0 bg-zinc-900">
            <div className="mb-4 flex flex-row items-center justify-between">
                <p className="ml-2 text-4xl">Filtros</p>
                <button
                    onClick={onClose}
                    className="text-center flex items-center justify-center py-1 text-4xl mr-2 rounded-full px-4 hover:bg-gray-700">
                    x
                </button>
            </div>
                <FilterGrouped/>
                <ButtonsTofilter/>
        </div>
    );
};

export default ModalFilters;
