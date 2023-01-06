import React from 'react';
import { useModal } from '../../@hooks/common/useModal';
import { UpdateCardModal } from '../common/Modal/UpdateCardModal';
import { Modal } from '../common/Modal';
import { Styled } from './style';

export const Card = ({ issue, DnD, deleteIssue, allState, owners }) => {
  const { isOpened, openModal, closeModal } = useModal();
  const { title, id } = issue;

  const {
    positionInfo: { position, targetId },
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = DnD;

  return (
    <>
      <Styled.Root
        draggable
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openModal}
        data-id={id}
        hover
        {...(targetId === id ? { position } : null)}>
        <Styled.Title>{title}</Styled.Title>
        <Styled.DeleteBtn onClick={() => deleteIssue(id)}>
          삭제
        </Styled.DeleteBtn>
      </Styled.Root>
      {isOpened && (
        <Modal closeModal={closeModal}>
          <UpdateCardModal
            issue={issue}
            allState={allState}
            owners={owners}
            closeModal={closeModal}
          />
        </Modal>
      )}
    </>
  );
};
