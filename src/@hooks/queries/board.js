import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createIssue,
  deleteIssue,
  getBoard,
  updateBoardTitle,
  updateDnD,
  updateIssue,
} from '../../apis/board';

export const useFetchBoard = () => {
  const data = useQuery(['board'], getBoard);

  return data.data;
};

export const useUpdateBoardTitle = () => {
  const queryClient = useQueryClient();

  return useMutation(updateBoardTitle, {
    onSuccess() {
      queryClient.invalidateQueries(['board']);
    },
  });
};

export const useUpdateDnD = () => {
  const queryClient = useQueryClient();

  return useMutation(updateDnD, {
    onSuccess() {
      queryClient.invalidateQueries(['board']);
    },
  });
};

export const useDeleteIssue = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteIssue, {
    onSuccess() {
      queryClient.invalidateQueries(['board']);
    },
  });
};

export const useCreateIssue = () => {
  const queryClient = useQueryClient();

  return useMutation(createIssue, {
    onSuccess() {
      queryClient.invalidateQueries(['board']);
    },
  });
};

export const useUpdateIssue = () => {
  const queryClient = useQueryClient();

  return useMutation(updateIssue, {
    onSuccess() {
      queryClient.invalidateQueries(['board']);
    },
  });
};
