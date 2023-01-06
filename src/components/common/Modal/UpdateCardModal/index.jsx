import React from 'react';
import { Styled } from './style';

export const UpdateCardModal = () => {
  return (
    <Styled.Root>
      <Styled.Title value={'title'} />
      <Styled.EndDate
        type="datetime-local"
        onChange={(e) => console.log(e.target.value)}
      />
      <Styled.State>
        <Styled.Label>상태</Styled.Label>
        <Styled.DropDownTrigger>
          <Styled.DropDownItem>selected</Styled.DropDownItem>
          {/* <Styled.DropDown>
            <Styled.DropDownItem>item1</Styled.DropDownItem>
            <Styled.DropDownItem>item2</Styled.DropDownItem>
          </Styled.DropDown> */}
        </Styled.DropDownTrigger>
      </Styled.State>
      <Styled.Owners>
        <Styled.Label>담당자</Styled.Label>
        <Styled.DropDownTrigger>
          <Styled.DropDownItem>selected</Styled.DropDownItem>
          {/* <Styled.DropDown>
            <Styled.DropDownItem>item1</Styled.DropDownItem>
            <Styled.DropDownItem>item2</Styled.DropDownItem>
          </Styled.DropDown> */}
        </Styled.DropDownTrigger>
      </Styled.Owners>
      <Styled.Content placeholder="제목을 입력하세요" />
      <Styled.SaveButton>Save</Styled.SaveButton>
    </Styled.Root>
  );
};
