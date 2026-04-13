export const generateCartKey = (dishId, variant, addOns) => {
  const normalizedAddOns = Array.isArray(addOns)
    ? addOns
        ?.map((a) => a.replace(" ", "").toLowerCase().trim())
        .sort()
        .join("+")
    : "";

  return `${dishId}-${variant || "default"}-${normalizedAddOns}`;
};
