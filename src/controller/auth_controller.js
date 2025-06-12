const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendOTP } = require("../utils/mailer");
require("dotenv").config();

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 phút

    const result = await pool.query(
      `INSERT INTO users (name, email, password, otp, otp_expires_at)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, hashedPassword, otp, otpExpiresAt]
    );

    await sendOTP(email, otp);

    res.status(201).json({ message: "Đăng ký thành công. Kiểm tra email để xác thực OTP." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Đăng ký thất bại" });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    const user = result.rows[0];
    if (!user) return res.status(404).json({ error: "Email không tồn tại" });

    if (user.otp !== otp || new Date() > new Date(user.otp_expires_at)) {
      return res.status(400).json({ error: "OTP không hợp lệ hoặc đã hết hạn" });
    }

    await pool.query(`UPDATE users SET is_verified = true, otp = NULL, otp_expires_at = NULL WHERE email = $1`, [email]);
    res.json({ message: "Xác thực thành công!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Xác thực thất bại" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    const user = result.rows[0];
    if (!user) return res.status(404).json({ error: "Sai email hoặc mật khẩu" });

    if (!user.is_verified) return res.status(401).json({ error: "Tài khoản chưa xác thực OTP" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Sai email hoặc mật khẩu" });

    const token = jwt.sign({ userId: user.id, userName: user.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.json({ message: "Đăng nhập thành công", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi đăng nhập" });
  }
};
