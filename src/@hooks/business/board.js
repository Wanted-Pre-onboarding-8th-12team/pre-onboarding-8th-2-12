import {
  useCreateIssue,
  useDeleteIssue,
  useUpdateBoardTitle,
  useUpdateIssue,
} from '../queries/board';

export const useBoard = () => {
  const createIssueMutation = useCreateIssue();
  const deleteIssueMutation = useDeleteIssue();
  const updateIssueMutation = useUpdateIssue();
  const updateTitleMutation = useUpdateBoardTitle();

  const updateTitle = (title) => {
    updateTitleMutation.mutate(title);
  };

  const deleteIssue = (id) => {
    deleteIssueMutation.mutate(id);
  };

  const createIssue = (
    { title, selectedOwnerList, stateId },
    { onSuccess, onSettled }
  ) => {
    const ownerList = selectedOwnerList.map(({ id }) => id);
    const payload = { title, ownerList, stateId };

    createIssueMutation.mutate(payload, {
      onSuccess,
      onSettled,
    });
  };

  const updateIssue = (
    { id, title, selectedState, selectedOwners, endDate, content },
    { onSuccess }
  ) => {
    const [state] = selectedState.map(({ id }) => id);
    const owners = selectedOwners.map(({ id }) => id);

    const payload = { id, title, state, owners, endDate, content };

    updateIssueMutation.mutate(payload, {
      onSuccess,
    });
  };

  return { updateTitle, deleteIssue, createIssue, updateIssue };
};
