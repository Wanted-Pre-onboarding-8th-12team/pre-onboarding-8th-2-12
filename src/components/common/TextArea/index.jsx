import React, { useRef } from 'react';

export const TextArea = (props) => {
  const { value, onChange, ...attr } = props;
  const ref = useRef();

  const resizeHeight = () => {
    ref.current.style.height = 'auto';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  };

  const changeHandler = (e) => {
    onChange(e);
    resizeHeight();
  };

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={changeHandler}
      rows={1}
      autoFocus
      {...attr}
    />
  );
};
