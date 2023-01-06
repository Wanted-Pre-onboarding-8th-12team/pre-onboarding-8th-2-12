import React from 'react';
import ReactDOM from 'react-dom';
import { Styled } from './style';

export const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    <Styled.Background>{children}</Styled.Background>,
    document.querySelector('#root')
  );
};
