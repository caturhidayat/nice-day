export const getDate = () => {
  const date = new Date();
  return date;
};

// Get the current date with clock
export const getDateTime = () => {
  const date = new Date();
  return date.toLocaleTimeString();
};

export const getDateTimeWithDate = () => {
  const date = new Date();
  return `${date.toDateString()} - ${date.toLocaleTimeString()}`;
}