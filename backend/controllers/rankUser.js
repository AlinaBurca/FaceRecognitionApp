
const pool = require('../db');
const rankUser = async (req, res) => {
  const {id}= req.body
  try {
    const result = await pool.query('SELECT entries FROM users WHERE id = $1', [id]);
    res.status(200).json({ entries: result.rows[0].entries });
  } catch (err) {
    console.error("Error getting user rank:", err.message);
    res.status(500).json({ error: "Failed to get user rank" });
  }
}
module.exports={rankUser};