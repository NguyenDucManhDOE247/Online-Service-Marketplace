exports.processPayment = (req, res) => {
  const { orderId, amount } = req.body;

  // Giả lập xử lý thanh toán
  if (!orderId || !amount) {
    return res.status(400).json({ error: "Thiếu orderId hoặc amount" });
  }

  res.json({
    message: "Thanh toán thành công",
    orderId,
    amount,
    status: "paid",
    paidAt: new Date(),
  });
};
