import axios from 'axios';

export const getBoard = async () => await axios('/board');

export const updateBoardTitle = async (title) =>
  await axios.put('/board/title', title);

export const updateDnD = async (payload) =>
  await axios.put('/board/dnd', payload);

export const deleteIssue = async (id) =>
  await axios.delete(`/board/issue/${id}`);

export const createIssue = async (payload) =>
  await axios.post(`/board/issue`, payload);

export const updateIssue = async (payload) =>
  await axios.put(`/board/issue`, payload);
