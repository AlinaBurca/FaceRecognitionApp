const crypto = require('crypto');
const nodemailer = require('nodemailer');
const pool = require('../db');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", 
    port: 587,
    secure: false, 
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASSWORD, 
    },
  });
  

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    console.log("Email:", email);
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Email not found" });
      }
      const resetToken = crypto.randomBytes(20).toString('hex');
      const resetTokenExpiry = new Date(Date.now() + 3600000); // Adaugă 1 oră
  
      await pool.query(
        "UPDATE users SET reset_token = $1, reset_token_expiry = $2 WHERE email = $3",
        [resetToken, resetTokenExpiry, email]
      );
      const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
  
      try {
        await transporter.sendMail({
          to: email,
          subject: "Password Reset",
          html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
        });
        res.status(200).json({ message: "Reset link sent to your email" });
  
      } catch (err) {
        console.error("Error sending email:", err.message);
        res.status(500).json({ message: "Failed to send reset link" });
      }
    } catch (err) {
      console.error("Error during password reset:", err.message);
      res.status(500).json({ error: "Failed to reset password" });
    }
  }
    module.exports = {forgotPassword};