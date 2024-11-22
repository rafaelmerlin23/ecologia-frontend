import { useState, useRef, useEffect } from 'react';

export const useModal = (initialPosition = { x: 0, y: 0 }) => {
  const [modalActive, setModalActive] = useState(false);
  const [position, setPosition] = useState(initialPosition);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  // Manejar clics fuera del modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        buttonRef.current !== event.target
      ) {
        setModalActive(false);
      }
    };

    if (modalActive) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalActive]);

  // Función para abrir el modal con una posición dinámica
  const openModal = (x, y) => {
    setPosition({ x, y });
    setModalActive(prev => !prev);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalActive(false);
  };

  
  return {
    modalActive,
    setModalActive,
    position,
    setPosition,
    modalRef,
    buttonRef,
    openModal,
    closeModal,
  };
};

export default useModal;
