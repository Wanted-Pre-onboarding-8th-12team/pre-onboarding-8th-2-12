import React, { useEffect } from 'react';
import { useBoard } from '../../../../@hooks/business/board';
import { useDropDown } from '../../../../@hooks/common/useDropDown';
import { useInput } from '../../../../@hooks/common/useInput';
import { useTargetContext } from '../../../../@hooks/common/useTargetContext';
import { Styled } from './style';

export const UpdateCardModal = ({ issue, allState, owners, closeModal }) => {
  const {
    title: initialTitle,
    content: initialContent,
    endDate: initialEndDate,
    state: currentState,
    owner,
    id,
  } = issue;

  const targetInfo = useTargetContext();
  const [title, titleHandler] = useInput(initialTitle);
  const [content, contentHandler] = useInput(initialContent);
  const [endDate, endDateHandler] = useInput(initialEndDate);
  const { updateIssue: updateMutation } = useBoard();

  const {
    values: [isStateOpened, selectedState, stateItems],
    handlers: [triggerState, closeState, switchState],
  } = useDropDown({
    initial: allState.filter(({ state }) => state === currentState),
    items: allState,
  });

  const {
    values: [isOwnersOpened, selectedOwners, ownersItems],
    handlers: [triggerOwners, closeOwners, _, addOwner],
  } = useDropDown({
    initial: owner,
    items: owners,
  });

  const updateIssue = (payload) =>
    updateMutation(payload, {
      onSuccess() {
        closeModal();
      },
    });

  useEffect(() => {
    if (
      isStateOpened &&
      (!targetInfo.target.closest('#state-trigger') ||
        targetInfo.target.closest('#state-item'))
    ) {
      closeState();
    }

    if (isOwnersOpened && !targetInfo.target.closest('#owners-trigger')) {
      closeOwners();
    }
  }, [targetInfo]);

  return (
    <Styled.Root>
      <Styled.Title type="text" value={title} onChange={titleHandler} />
      <Styled.EndDate
        type="datetime-local"
        value={endDate}
        onChange={endDateHandler}
      />
      <Styled.State>
        <Styled.Label>상태</Styled.Label>
        <Styled.DropDownTrigger onClick={triggerState} id="state-trigger">
          {selectedState.map(({ state }, i) => (
            <Styled.DropDownItem key={i}>{state}</Styled.DropDownItem>
          ))}

          {isStateOpened && (
            <Styled.DropDown id="dropdown">
              {stateItems.map((item) => (
                <Styled.DropDownItem
                  key={item.id}
                  id="state-item"
                  onClick={() => switchState(item)}>
                  {item.state}
                </Styled.DropDownItem>
              ))}
            </Styled.DropDown>
          )}
        </Styled.DropDownTrigger>
      </Styled.State>
      <Styled.Owners>
        <Styled.Label>담당자</Styled.Label>
        <Styled.DropDownTrigger onClick={triggerOwners} id="owners-trigger">
          {selectedOwners.map(({ id, name }) => (
            <Styled.DropDownItem key={id}>{name}</Styled.DropDownItem>
          ))}
          {isOwnersOpened && (
            <Styled.DropDown id="dropdown">
              {ownersItems.map((item) => (
                <Styled.DropDownItem
                  key={item.id}
                  onClick={() => addOwner(item)}>
                  {item.name}
                </Styled.DropDownItem>
              ))}
            </Styled.DropDown>
          )}
        </Styled.DropDownTrigger>
      </Styled.Owners>
      <Styled.Content
        placeholder="제목을 입력하세요"
        value={content}
        onChange={contentHandler}
      />
      <Styled.SaveButton
        onClick={() =>
          updateIssue({
            id,
            title,
            selectedState,
            selectedOwners,
            endDate,
            content,
          })
        }>
        Save
      </Styled.SaveButton>
    </Styled.Root>
  );
};
