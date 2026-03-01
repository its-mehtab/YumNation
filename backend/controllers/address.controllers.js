import Address from "../models/address.modal.js";

export const getUserAddress = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "User ID not found" });
  }

  try {
    const addresses = await Address.find({ user: req.userId })
      .select("-addressKey -user -__v")
      .sort({
        isDefault: -1,
        createdAt: -1,
      });

    res.status(200).json(addresses);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const createAddress = async (req, res) => {
  try {
    const userId = req.userId;

    const addressCount = await Address.countDocuments({ user: userId });

    if (addressCount >= 5) {
      return res.status(400).json({
        message: "Maximum 5 addresses allowed",
      });
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

    const addressKey = `${addressLine1}-${city}-${state}-${pinCode}`
      .toLowerCase()
      .replace(/\s+/g, "");

    const existing = await Address.findOne({ user: userId, addressKey });

    if (existing) {
      return res.status(400).json({
        message: "Address already exists",
      });
    }

    if (isDefault) {
      await Address.updateMany(
        { user: userId },
        { $set: { isDefault: false } },
      );
    }

    const newAddress = await Address.create({
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
      isDefault,
    });

    return res.status(201).json(newAddress);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const address = await Address.findOne({ _id: id, user: userId }).select(
      "-addressKey -user -__v",
    );

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    if (address.isDefault && req.body.isDefault === false) {
      return res.status(400).json({
        message: "At least one default address is required",
      });
    }

    const allowedFields = [
      "fullName",
      "phoneNumber",
      "addressLine1",
      "addressLine2",
      "city",
      "state",
      "pinCode",
      "country",
      "addressType",
      "isDefault",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        address[field] = req.body[field];
      }
    });

    address.addressKey =
      `${address.addressLine1}-${address.city}-${address.state}-${address.pinCode}`
        .toLowerCase()
        .replace(/\s+/g, "");

    if (req.body.isDefault === true) {
      await Address.updateMany(
        { user: userId, _id: { $ne: id } },
        { $set: { isDefault: false } },
      );
    }

    await address.save();

    return res.status(200).json(address);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await Address.findOneAndDelete({
      _id: id,
      user: req.userId,
    }).select("-addressKey -user -__v");

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    return res.status(200).json({
      message: "Address deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
