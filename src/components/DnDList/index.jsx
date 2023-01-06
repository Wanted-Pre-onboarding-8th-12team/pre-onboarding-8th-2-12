import React, { memo } from 'react';
import { useBoard } from '../../@hooks/business/board';
import { useDnD } from '../../@hooks/common/useDnD';
import { useCreatingCard } from '../../@hooks/ui/board';
import { Card } from '../Card';
import { CreatingCard } from '../Card/CreatingCard';
import * as Styled from './style';

export const DnDList = memo(
  ({ stateData, owners, allState, onDelete: deleteIssue }) => {
    const { id, state, issues } = stateData;
    const { createIssue: createMutation } = useBoard();
    const DnD = useDnD();
    const {
      values: { isCreating },
      handlers: { startCreating, finishCreating },
    } = useCreatingCard();

    const createIssue = (payload) =>
      createMutation(payload, {
        onSuccess() {
          finishCreating();
        },
      });

    return (
      <Styled.Root>
        <Styled.State>
          {state} {issues.length} <Styled.AddBtnIC>+</Styled.AddBtnIC>
        </Styled.State>
        <Styled.CardList data-state-id={id}>
          {issues.map((issue) => (
            <Card
              key={issue.id}
              issue={issue}
              DnD={DnD}
              deleteIssue={deleteIssue}
              allState={allState}
              owners={owners}
            />
          ))}
          {isCreating && (
            <CreatingCard
              owners={owners}
              createIssue={createIssue}
              stateId={id}
            />
          )}
          <Styled.AddBtn onClick={startCreating}>+</Styled.AddBtn>
        </Styled.CardList>
      </Styled.Root>
    );
  }
);
