export const getDate = () => {
  const date = new Date();
  return date.toDateString();
};

// Get the current date with clock
export const getDateTime = () => {
  const date = new Date();
  return date.toLocaleTimeString();
};

export const getDateIso = () => {
  const date = new Date();
  return new Date().toISOString().split("T")[0];
  
}
