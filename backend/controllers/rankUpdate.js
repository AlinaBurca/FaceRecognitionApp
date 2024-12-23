const pool = require('../db');

const rankUpdate = async (req, res) => {
    const { id } = req.body;
  
    try {
      const result = await pool.query(
        'UPDATE users SET entries = entries + 1 WHERE id = $1 RETURNING entries',
        [id]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ entries: result.rows[0].entries });
    } catch (err) {
      console.error("Error updating entries:", err.message);
      res.status(500).json({ error: "Failed to update entries" });
    }
  }

  module.exports = {rankUpdate};