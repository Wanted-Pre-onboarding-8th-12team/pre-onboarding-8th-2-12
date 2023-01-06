import React, { useState } from 'react';

export const useDropDown = (
  { initial, items } = { initial: [], items: [] }
) => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedItems, setSelectedItems] = useState(initial);
  const [dropDownItems, setDropDownItems] = useState(items);

  const trigger = () => setIsOpened(true);
  const close = () => setIsOpened(false);
  const switchItem = (item) => setSelectedItems([item]);
  const addItem = (item) => {
    const exist = selectedItems.find((selected) => selected.id === item.id);

    if (!exist) setSelectedItems((prev) => [...prev, item]);
  };

  return {
    values: [isOpened, selectedItems, dropDownItems],
    handlers: [trigger, close, switchItem, addItem],
  };
};
