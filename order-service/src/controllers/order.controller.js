const Order = require("../models/order.model");
const axios = require("axios");

exports.createOrder = async (req, res) => {
  const { userEmail, productId, quantity, totalPrice } = req.body;

  try {
    const check = await axios.get(`http://user-service:4001/api/users/check/${userEmail}`);
    if (!check.data.exists) {
      return res.status(400).json({ error: "Email người dùng không tồn tại!" });
    }

    const order = new Order({ userEmail, productId, quantity, totalPrice });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error("Lỗi khi tạo đơn hàng:", err.message);
    res.status(500).json({ error: "Lỗi server hoặc không kết nối được user-service" });
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

exports.getOrdersByUser = async (req, res) => {
  const email = req.params.email;
  const orders = await Order.find({ userEmail: email });
  res.json(orders);
};
