import Address from "../models/address.modal.js";

export const getUserAddress = async (req, res) => {
  const user = req.userId;
  const id = req.body;

  if (!userId) {
    return res.status(401).json({ message: "User ID not found" });
  }

  try {
    const userAddress = await Address.find({ user });

    res.status(200).json(userAddress);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

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
    isDefault,
  } = req.body;
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "User ID not found" });
  }

  const addressKey = `${fullName}-${addressLine1}-${city}-${state}-${pinCode}`
    .toLowerCase()
    .replace(/\s+/g, "");

  try {
    const addressCount = await Address.countDocuments({ user: userId });

    if (addressCount >= 5) {
      return res.status(400).json({
        message: "You can only save up to 5 addresses",
      });
    }

    const address = await Address.findOne({ user: userId, addressKey });

    if (!address) {
      if (isDefault) {
        await Address.updateMany(
          { user: userId },
          { $set: { isDefault: false } },
        );
      }

      const address = await Address.create({
        user: userId,
        addressKey,
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

      return res.status(201).json(address);
    } else {
      return res.status(400).json({
        message: "This address is already added",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const updateAddress = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

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
    isDefault,
  } = req.body;

  try {
    const address = await Address.findById(id);

    if (!address) {
      return res.status(400).json({ message: "Address not fount" });
    }

    if (fullName !== undefined) address.fullName = fullName;
    if (phoneNumber !== undefined) address.phoneNumber = phoneNumber;
    if (addressLine1 !== undefined) address.addressLine1 = addressLine1;
    if (addressLine2 !== undefined) address.addressLine2 = addressLine2;
    if (city !== undefined) address.city = city;
    if (state !== undefined) address.state = state;
    if (pinCode !== undefined) address.pinCode = pinCode;
    if (country !== undefined) address.country = country;
    if (addressType !== undefined) address.addressType = addressType;
    if (isDefault !== undefined) address.isDefault = isDefault;

    await address.save();

    return res.status(200).json(address);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const deleteAddress = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    const address = await Address.findByIdAndDelete(id);

    if (!address) {
      return res
        .status(400)
        .json({ message: "Address not found. Nothing deleted" });
    }

    return res
      .status(200)
      .json({ message: "Address deleted successfully", address });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};
