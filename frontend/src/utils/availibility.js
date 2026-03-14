export const fetchAvailibility = (dish) => {
  const isSoldOut = dish.stock <= 0;
  const isUnavailable = !dish.isAvailable;

  const statusText = isSoldOut && isUnavailable ? "Sold Out" : "Unavailable";

  return { isSoldOut, isUnavailable, statusText };
};
