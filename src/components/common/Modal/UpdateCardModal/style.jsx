import styled from 'styled-components';
import { TextArea } from '../../TextArea';

const Styled = {
  Root: styled.div`
    display: flex;
    flex-direction: column;

    position: absolute;
    left: 50%;
    top: 50%;

    transform: translate(-50%, -50%);

    width: 50rem;
    height: 70rem;

    padding: 2rem;
    background-color: white;
  `,

  Label: styled.label`
    width: 5rem;
    line-height: 5rem;

    flex-shrink: 0;

    font-size: 1.2rem;
  `,

  Title: styled.input`
    border: none;
    outline: none;

    padding: 1rem 0;

    font-size: 2rem;
  `,

  State: styled.div`
    display: flex;
    align-items: center;

    position: relative;
    z-index: 9999;
  `,

  Owners: styled.div`
    display: flex;
    align-items: center;

    position: relative;
    z-index: 8888;
  `,

  EndDate: styled.input``,

  DropDownTrigger: styled.ul`
    display: flex;

    width: 100%;

    overflow: scroll;

    &:hover {
      background-color: lightgray;
    }
  `,

  DropDown: styled.ul`
    display: flex;
    flex-direction: column;

    position: absolute;
    top: 100%;

    width: 50%;
    background-color: white;

    overflow: scroll;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.12);

    & > li:not(:first-child) {
      border-top: 1px solid lightgray;
    }
  `,

  DropDownItem: styled.li`
    font-size: 1.5rem;
    padding: 1rem 0 1rem 1rem;

    &:hover {
      background-color: lightgray;
    }
  `,

  Content: styled(TextArea)`
    flex-grow: 1;

    outline: none;

    padding: 1rem;

    resize: none;
  `,

  SaveButton: styled.button`
    width: 10rem;

    padding: 1rem 0;
    margin: 0 auto;
    margin-top: 2rem;
  `,
};

export { Styled };
