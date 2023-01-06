import { useCallback, useState } from 'react';

export const useModal = () => {
  const [isOpened, setIsOpened] = useState(false);

  const openModal = useCallback(() => {
    setIsOpened(true);
  }, []);

  const closeModal = useCallback((callback = () => {}) => {
    callback();
    setIsOpened(false);
  }, []);

  const toggleModal = useCallback(() => {
    setIsOpened((prev) => !prev);
  }, []);

  return { isOpened, openModal, closeModal, toggleModal };
};
