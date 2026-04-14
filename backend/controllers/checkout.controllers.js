import Cart from "../models/cart.modal.js";

export const validateCartBeforeCheckout = async (req, res) => {
  const userId = req.userId;

  try {
    const cart = await Cart.findOne({ user: userId })
      .populate(
        "restaurant",
        "name logo slug cuisine address isOpen rating deliveryFee deliveryTime status",
      )
      .populate("items.dish", "name slug price isAvailable variants addOns");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    if (!cart.restaurant.isOpen) {
      return res.status(400).json({ message: "Restaurant is closed" });
    }

    if (cart.restaurant.status !== "active") {
      return res.status(400).json({ message: "Restaurant is not active" });
    }

    let priceChanged = false;

    for (const item of cart.items) {
      const dish = item.dish;

      if (!dish || !dish.isAvailable) {
        return res.status(400).json({
          message: `"${item.name}" is no longer available`,
        });
      }

      // Normalize — treat missing arrays as empty arrays
      const dishVariants = dish.variants ?? [];
      const dishAddOns = dish.addOns ?? [];

      let expectedPrice = dish.price; // base price

      // ── Variant check ──────────────────────────────────────────────
      if (item.variant?.name) {
        // Cart has a variant selected
        if (dishVariants.length === 0) {
          // Variants were removed from the dish entirely
          return res.status(400).json({
            message: `"${dish.name}" no longer has variants`,
          });
        }

        const variantDoc = dishVariants.find(
          (v) => v.name === item.variant.name,
        );

        if (!variantDoc) {
          return res.status(400).json({
            message: `Variant "${item.variant.name}" no longer exists for "${dish.name}"`,
          });
        }

        expectedPrice = variantDoc.price;
      } else if (dishVariants.length > 0) {
        // Dish now requires a variant but cart item has none — edge case
        return res.status(400).json({
          message: `"${dish.name}" now requires a variant selection`,
        });
      }

      // ── Add-on check ───────────────────────────────────────────────
      const cartAddOns = item.addOns ?? [];

      for (const cartAddOn of cartAddOns) {
        if (dishAddOns.length === 0) {
          // Add-ons were removed from the dish entirely
          return res.status(400).json({
            message: `"${dish.name}" no longer has add-ons`,
          });
        }

        const dishAddOn = dishAddOns.find((a) => a.name === cartAddOn.name);

        if (!dishAddOn) {
          return res.status(400).json({
            message: `Add-on "${cartAddOn.name}" is no longer available for "${dish.name}"`,
          });
        }

        expectedPrice += dishAddOn.price;
      }

      // ── Price drift check ──────────────────────────────────────────
      if (item.price !== expectedPrice) {
        item.price = expectedPrice;
        priceChanged = true;
      }
    }

    if (priceChanged) {
      await cart.save();
      return res.status(409).json({
        message:
          "Some prices have changed. Please review your cart before proceeding.",
        cart,
      });
    }

    return res.status(200).json(cart);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Cart validation error", error: error.message });
  }
};
