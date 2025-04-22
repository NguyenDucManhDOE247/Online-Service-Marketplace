const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRoutes = require("./routes/product.routes");
const cors = require("cors");
const Product = require("./models/product.model"); // 👈 THÊM

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Kết nối MongoDB thành công");

    // 👇 THÊM ĐOẠN NÀY
    const count = await Product.estimatedDocumentCount();
    if (count === 0) {
      await Product.insertMany([
        {
          name: "Web Development",
          description: "Thiết kế và phát triển website responsive hiện đại",
          price: 500,
          category: "Web",
        },
        {
          name: "Mobile App Development",
          description: "Xây dựng ứng dụng Android và iOS native hoặc cross-platform",
          price: 800,
          category: "Mobile",
        },
        {
          name: "UI/UX Design",
          description: "Thiết kế giao diện người dùng đẹp mắt, dễ sử dụng",
          price: 400,
          category: "Design",
        },
        {
          name: "Backend API Development",
          description: "Xây dựng hệ thống API chuẩn RESTful với Node.js",
          price: 600,
          category: "Backend",
        },
        {
          name: "DevOps Setup",
          description: "CI/CD, Docker, Kubernetes, tối ưu vận hành hệ thống",
          price: 700,
          category: "Infrastructure",
        },
      ]);
      console.log("✅ Đã seed 5 dịch vụ mẫu vào MongoDB");
    }
  })
  .catch((err) => console.error("❌ Lỗi Mongo:", err));

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`Product Service chạy ở cổng ${PORT}`);
});
