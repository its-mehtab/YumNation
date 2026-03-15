import Cart from "../models/cart.modal.js";

export const validateCartBeforeCheckout = async (req, res) => {
  const userId = req.userId;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.dish");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let priceChanged = false;

    for (const item of cart.items) {
      const dish = item.dish;

      if (!dish || !dish.isAvailable) {
        return res.status(400).json({
          message: `${item.name} is no longer available`,
        });
      }

      let expectedPrice = dish.price;

      if (item.variant) {
        const variantDoc = dish.variants.find((v) => v.name === item.variant);

        if (!variantDoc) {
          return res.status(400).json({
            message: `Variant ${item.variant} no longer exists`,
          });
        }

        expectedPrice = variantDoc.price;
      }

      if (item.addOns && item.addOns.length > 0) {
        for (const cartAddOn of item.addOns) {
          const dishAddOn = dish.addOns?.find((a) => a.name === cartAddOn.name);

          if (!dishAddOn) {
            return res.status(400).json({
              message: `Add-on ${cartAddOn.name} no longer available`,
            });
          }

          expectedPrice += dishAddOn.price;
        }
      }

      if (item.price !== expectedPrice) {
        item.price = expectedPrice;
        priceChanged = true;
      }
    }

    if (priceChanged) {
      await cart.save();

      return res.status(400).json({
        message: "Price updated. Please review before proceed.",
        cart: cart.items,
      });
    }

    return res.status(200).json(cart.items);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Update Cart error", error: error.message });
  }
};
