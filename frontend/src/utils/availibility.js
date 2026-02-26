export const fetchAvailibility = (product) => {
  const isSoldOut = product.stock <= 0;
  const isUnavailable = !product.isAvailable;

  const statusText = isSoldOut && isUnavailable ? "Sold Out" : "Unavailable";

  return { isSoldOut, isUnavailable, statusText };
};
