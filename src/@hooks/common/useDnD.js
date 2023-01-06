import { useState } from 'react';
import { useUpdateDnD } from '../queries/board';

const getPositionInfo = (elem, y) => {
  const info = elem.getBoundingClientRect();
  const offset = y - info.top - info.height / 2;

  return offset < 0
    ? { position: 'before', targetId: elem.dataset.id }
    : { position: 'after', targetId: elem.dataset.id };
};

const initialInfo = {
  position: '',
  targetId: null,
};

export const useDnD = () => {
  let draggingId = null;
  const { mutate: updateDnD } = useUpdateDnD();
  const [positionInfo, setPositionInfo] = useState(initialInfo);

  const handleDragStart = (e) => {
    draggingId = e.target.dataset.id;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('draggingId', draggingId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();

    const newPositionInfo = getPositionInfo(e.target, e.clientY);

    if (
      positionInfo.position !== newPositionInfo.position &&
      draggingId !== newPositionInfo.targetId
    ) {
      setPositionInfo((prev) => ({ ...prev, ...newPositionInfo }));
    }
  };

  const handleDrop = (e) => {
    const draggingId = e.dataTransfer.getData('draggingId');

    /**
     * 제자리 DnD 방지를 위해 targetId 여부를 확인한다
     * 뮤테이션 후 초기화
     */
    if (positionInfo.targetId && draggingId !== positionInfo.targetId) {
      updateDnD({ ...positionInfo, draggingId });
    }

    setPositionInfo(initialInfo);
  };

  const handleDragLeave = (e) => setPositionInfo(initialInfo);

  return {
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragLeave,
    positionInfo,
  };
};
