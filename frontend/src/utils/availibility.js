export const fetchAvailibility = (dish) => {
  const isUnavailable = !dish.isAvailable;

  const statusText = "Unavailable";

  return { isUnavailable, statusText };
};
