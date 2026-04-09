import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import cors from "cors";
import authRouter from "./routes/public/auth.routes.js";
import cookieParser from "cookie-parser";
import categoryRouter from "./routes/public/category.routes.js";
import dishRouter from "./routes/public/dish.routes.js";
import cartRouter from "./routes/user/cart.routes.js";
import wishlistRouter from "./routes/user/wishlist.routes.js";
import addressRouter from "./routes/user/address.routes.js";
import couponRouter from "./routes/user/coupon.routes.js";
import checkoutRouter from "./routes/user/checkout.routes.js";
import orderRouter from "./routes/user/order.routes.js";
import restaurantRouter from "./routes/public/restaurant.routes.js";
import restaurantOwnerRouter from "./routes/owner/restaurantOwner.routes.js";
import dishOwnerRouter from "./routes/owner/dishOwner.routes.js";
import restaurantAdminRouter from "./routes/admin/restaurantAdmin.routes.js";
import dishAdminRouter from "./routes/admin/dishAdmin.routes.js";
import couponAdminRouter from "./routes/admin/couponAdmin.routes.js";

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
app.use("/api/owner/dish", dishOwnerRouter);
app.use("/api/admin/dish", dishAdminRouter);
app.use("/api/restaurant", restaurantRouter);
app.use("/api/owner/restaurant", restaurantOwnerRouter);
app.use("/api/admin/restaurant", restaurantAdminRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/address", addressRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/admin/coupon", couponAdminRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Home Page" });
});

app.listen(port, async () => {
  await connectDb();
  console.log(`server is running on port ${port}`);
});
