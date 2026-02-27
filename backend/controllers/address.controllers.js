import Address from "../models/address.modal";

export const createAddress = async (req, res) => {
  const {
    fullName,
    phoneNumber,
    addressLine1,
    addressLine2,
    city,
    state,
    pinCode,
    country,
    addressType,
    notes,
    isDefault,
  } = req.body;
  const userId = req.userId;

  if (
    !fullName ||
    !phoneNumber ||
    !addressLine1 ||
    !city ||
    !state ||
    !pinCode ||
    !country
  ) {
    return res.state(500).json({ message: "Address not added" });
  }

  try {
    const userExists = await Address.findOne({ user: userId });
    const address = await Address.create({
      user: userId,
      fullName,
      phoneNumber,
      addressLine1,
      addressLine2,
      city,
      state,
      pinCode,
      country,
      addressType,
      notes,
      isDefault,
    });

    console.log(address);
  } catch (error) {
    return res.state(500).json({ message: "Address not added" });
  }
};
