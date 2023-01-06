import { useBoard } from '../../@hooks/business/board';
import { useFetchBoard } from '../../@hooks/queries/board';
import { editableHandler } from '../../utils/editableHandler';
import { Modal } from '../common/Modal';
import { UpdateCardModal } from '../common/Modal/UpdateCardModal';
import { DnDList } from '../DnDList';
import { Styled } from './style';

export const Board = () => {
  const { data: board } = useFetchBoard();
  const { updateTitle, deleteIssue } = useBoard();

  return (
    <Styled.Root>
      <Styled.Title
        contentEditable
        suppressContentEditableWarning
        {...editableHandler(updateTitle)}>
        {board.title}
      </Styled.Title>
      <Styled.Main>
        {board.states.map((state) => (
          <DnDList
            key={state.id}
            stateData={state}
            onDelete={deleteIssue}
            owners={board.owners}
          />
        ))}
      </Styled.Main>
      <Modal>
        <UpdateCardModal />
      </Modal>
    </Styled.Root>
  );
};
