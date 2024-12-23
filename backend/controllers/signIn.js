const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const singIn = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];
  
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
  
      const token = jwt.sign(
        { id: user.id, email: user.email, email: user.email, name: user.name }, 
        JWT_SECRET, 
        { expiresIn: "3h" } 
      );
  
      res.status(200).json({
        message: "Login successful",
        token: token,
      });
    } catch (err) {
      console.error("Error during authentication:", err.message);
      res.status(500).json({ error: "Authentication failed" });
    }
  }

  module.exports = {singIn};