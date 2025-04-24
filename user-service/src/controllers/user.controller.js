const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ error: "Email đã tồn tại" });

  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = new User({ email, password: hashed });
    await user.save();
    res.json({ message: "Đăng ký thành công" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi máy chủ" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "Không tìm thấy người dùng" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Sai mật khẩu" });

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
  res.json({ message: "Đăng nhập thành công", token });
};

exports.checkEmail = async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ exists: false });
  res.json({ exists: true });
};
