export const getToday = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const hours = today.getHours();
  const minutes = today.getMinutes();

  const date = year + '-' + month + '-' + day + `T${hours}:${minutes}`;

  return date;
};
