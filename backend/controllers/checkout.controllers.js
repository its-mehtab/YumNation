import Cart from "../models/cart.modal";

export const validateCartBeforeCheckout = async (req, res) => {
  const userId = req.userId;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let cartChanged = false;

    for (const item of cart.items) {
      const product = item.product;

      if (!product || !product.isAvailable || product.stock <= 0) {
        return res.status(400).json({
          message: `${item.name} is no longer available`,
        });
      }

      if (item.quantity > product.stock) {
        item.quantity = product.stock;
        cartChanged = true;
      }

      let expectedPrice = product.price;

      if (item.variant) {
        const variantDoc = product.variants.find(
          (v) => v.name === item.variant,
        );

        if (!variantDoc) {
          return res.status(400).json({
            message: `Variant ${item.variant} no longer exists`,
          });
        }

        expectedPrice = variantDoc.price;
      }

      if (item.addOns && item.addOns.length > 0) {
        for (const cartAddOn of item.addOns) {
          const productAddOn = product.addOns?.find(
            (a) => a.name === cartAddOn.name,
          );

          if (!productAddOn) {
            return res.status(400).json({
              message: `Add-on ${cartAddOn.name} no longer available`,
            });
          }

          expectedPrice += productAddOn.price;
        }
      }

      if (item.price !== expectedPrice) {
        item.price = expectedPrice;
        cartChanged = true;
      }
    }

    if (cartChanged) {
      await cart.save();

      return res.status(400).json({
        message: "Cart updated due to changes. Please review.",
        ...cart.items,
      });
    }

    return res.status(400).json(cart.items);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Update Cart error", error: error.message });
  }
};
