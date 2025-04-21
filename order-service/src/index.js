const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const orderRoutes = require("./routes/order.routes");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Kết nối MongoDB thành công"))
  .catch((err) => console.error("Lỗi Mongo:", err));

app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => {
  console.log(`Order Service chạy ở cổng ${PORT}`);
});
