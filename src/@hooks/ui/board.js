import { useEffect, useState } from 'react';
import { useInput } from '../common/useInput';

export const useCreatingCard = () => {
  const [title, titleHandler] = useInput();
  const [isSearching, setIsSearching] = useState(false);

  const startSearch = () => setIsSearching(true);
  const finishSearch = () => setIsSearching(false);
  const toggleSearch = () => setIsSearching((prev) => !prev);

  return {
    values: {
      title,
      isSearching,
    },
    handlers: {
      startSearch,
      finishSearch,
      toggleSearch,
      titleHandler,
    },
  };
};

export const useCratingCardSearchForm = (owners) => {
  const [searchInput, searchInputHandler] = useInput();
  const [selectedOwnerList, setSelectedOwnerList] = useState([]);
  const [searchedOwnerList, setSearchedOwnerList] = useState([]);

  const selectHandler = (owner) => {
    const exist = selectedOwnerList.find(
      (selected) => selected.id === owner.id
    );

    if (!exist) setSelectedOwnerList((prev) => [...prev, owner]);
  };

  const deleteHandler = (id) => {
    const newSelectedOwnerList = selectedOwnerList.filter(
      (selected) => selected.id !== id
    );

    setSelectedOwnerList(newSelectedOwnerList);
  };

  useEffect(() => {
    const searched = owners.filter((owner) => owner.name === searchInput);

    setSearchedOwnerList(searched);
  }, [searchInput]);

  return {
    values: { searchInput, searchedOwnerList, selectedOwnerList },
    handlers: { searchInputHandler, selectHandler, deleteHandler },
  };
};
