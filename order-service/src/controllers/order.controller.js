const Order = require("../models/order.model");
const mongoose = require("mongoose");

exports.createOrder = async (req, res) => {
  const { userEmail, productId, quantity, totalPrice } = req.body;

  // ✅ Kiểm tra email người dùng có tồn tại không
  try {
    const userExists = await mongoose.connection.db
      .collection("users") // tên collection từ user-service
      .findOne({ email: userEmail });

    if (!userExists) {
      return res.status(400).json({ error: "Email người dùng không tồn tại!" });
    }

    const order = new Order({ userEmail, productId, quantity, totalPrice });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error("Lỗi khi tạo đơn hàng:", err);
    res.status(500).json({ error: "Lỗi server khi tạo đơn hàng" });
  }
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ error: "Không tìm thấy đơn hàng" });
  res.json(order);
};
