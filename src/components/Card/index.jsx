import React from 'react';
import { Modal } from '../common/Modal';
import { Styled } from './style';

export const Card = ({ issue, DnD, onClick: deleteIssue }) => {
  const { title, id } = issue;

  const {
    positionInfo: { position, targetId },
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = DnD;

  return (
    <Styled.Root
      draggable
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      data-id={id}
      hover
      {...(targetId === id ? { position } : null)}>
      <Styled.Title>{title}</Styled.Title>
      <Styled.DeleteBtn onClick={() => deleteIssue(id)}>삭제</Styled.DeleteBtn>
      {/* <Modal></Modal> */}
    </Styled.Root>
  );
};
