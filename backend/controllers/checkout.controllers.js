import Address from "../models/address.modal.js";
import Cart from "../models/cart.modal.js";
import Order from "../models/order.modal.js";

export const validateCartBeforeCheckout = async (req, res) => {
  const userId = req.userId;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let priceChanged = false;
    let stockChanged = false;

    for (const item of cart.items) {
      const product = item.product;

      if (!product || !product.isAvailable || product.stock <= 0) {
        return res.status(400).json({
          message: `${item.name} is no longer available`,
        });
      }

      if (item.quantity > product.stock) {
        item.quantity = product.stock;
        stockChanged = true;
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
    if (stockChanged) {
      await cart.save();

      return res.status(400).json({
        message: "Stock updated. Please review before proceed.",
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

export const createOrder = async (req, res) => {
  const userId = req.userId;
  const {
    deliveryAddress,
    deliveryFee,
    tax,
    discount,
    couponCode,
    totalAmount,
    paymentMethod,
    paymentStatus,
  } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // const coupon = await Coupon.findOne();

    const subtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    const deliveryFee = 2.5;
    const total = subtotal + deliveryFee - discount;
    const tax = (total * 5) / 100;

    const order = await Order.create({
      user: userId,
      items: cart.items,
      deliveryAddress,
      subtotal,
      deliveryFee,
      tax,
      discount: 5,
      totalAmount: 546,
      paymentMethod: "cod",
      paymentStatus: "paid",
    });
  } catch (error) {
    console.error("createOrder error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
