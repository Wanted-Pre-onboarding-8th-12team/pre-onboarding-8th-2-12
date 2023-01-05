import React, { memo } from 'react';
import { useDnD } from '../../@hooks/common/useDnD';
import { useCreatingCard } from '../../@hooks/ui/board';
import { Card } from '../Card';
import { CreatingCard } from '../Card/CreatingCard';
import * as Styled from './style';

export const DnDList = memo(({ stateData, owners, onDelete: deleteIssue }) => {
  const { id, state, issues } = stateData;
  const DnD = useDnD();
  const {
    values: { isCreating },
    handlers: { startCreating },
  } = useCreatingCard();

  return (
    <Styled.Root>
      <Styled.State>
        {state} {issues.length} <Styled.AddBtnIC>+</Styled.AddBtnIC>
      </Styled.State>
      <Styled.CardList data-state-id={id}>
        {issues.map((issue) => (
          <Card key={issue.id} issue={issue} DnD={DnD} onClick={deleteIssue} />
        ))}
        {isCreating && <CreatingCard owners={owners} />}
        <Styled.AddBtn onClick={startCreating}>+</Styled.AddBtn>
      </Styled.CardList>
    </Styled.Root>
  );
});
