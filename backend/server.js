import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import categoryRouter from "./routes/category.routes.js";
import dishRouter from "./routes/dish.routes.js";
import cartRouter from "./routes/cart.routes.js";
import wishlistRouter from "./routes/wishlist.routes.js";
import addressRouter from "./routes/address.routes.js";
import couponRouter from "./routes/coupon.routes.js";
import checkoutRouter from "./routes/checkout.routes.js";
import orderRouter from "./routes/order.routes.js";
import restaurantRouter from "./routes/restaurant.routes.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/api", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/dish", dishRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/address", addressRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/order", orderRouter);
app.use("/api/restaurant", restaurantRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Home Page" });
});

app.listen(port, async () => {
  await connectDb();
  console.log(`server is running on port ${port}`);
});
