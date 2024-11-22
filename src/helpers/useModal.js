import { useState, useRef, useEffect } from 'react';

export const useModal = (initialPosition = { x: 0, y: 0 }) => {
  const [modalActive, setModalActive] = useState(false);
  const [position, setPosition] = useState(initialPosition);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

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

  const openModal = (x, y) => {
    setPosition({ x, y });
    setModalActive(prev => !prev);
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const openTagsFilter = (event) => {
    const rect = event.target.getBoundingClientRect();
    const eventY = event.clientY
    openModal(rect.left + window.scrollX, eventY);

  };


  return {
    modalActive,
    setModalActive,
    position,
    setPosition,
    modalRef,
    buttonRef,
    closeModal,
    openTagsFilter
  };
};

export default useModal;
