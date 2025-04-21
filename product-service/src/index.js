const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRoutes = require("./routes/product.routes");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Kết nối MongoDB thành công"))
  .catch((err) => console.error("Lỗi Mongo:", err));

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`Product Service chạy ở cổng ${PORT}`);
});
