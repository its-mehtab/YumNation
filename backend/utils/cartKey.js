export const generateCartKey = (productId, variant, addOns) => {
  const normalizedAddOns = Array.isArray(addOns)
    ? addOns
        .map((a) => a.toLowerCase().trim())
        .sort()
        .join("-")
    : "";

  return `${productId}-${variant}-${normalizedAddOns}`;
};
