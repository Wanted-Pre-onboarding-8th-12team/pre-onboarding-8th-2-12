import React from 'react';
import ReactDOM from 'react-dom';
import { Styled } from './style';

export const Modal = ({ children, closeModal }) => {
  return ReactDOM.createPortal(
    <>
      <Styled.Background onClick={closeModal} />
      {children}
    </>,
    document.querySelector('#root')
  );
};
