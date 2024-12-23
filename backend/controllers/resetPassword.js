 const pool = require('../db');
 const bcrypt = require('bcrypt');
 
 const ResetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE reset_token = $1 AND reset_token_expiry > NOW()',
      [token]
    );
        if (result.rowCount === 0) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    const user = result.rows[0];
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('UPDATE users SET password = $1, reset_token = NULL, reset_token_expiry = NULL WHERE id = $2', [hashedPassword, user.id]);
    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Error during password reset:", err.message);
    res.status(500).json({ error: "Failed to reset password" });
  }
}
module.exports = {ResetPassword};