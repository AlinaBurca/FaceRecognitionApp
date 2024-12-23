const pool = require("../db");
const bcrypt = require("bcrypt");

const validateUserInput = (username, email, password) => {
  
  if (!username || username.trim().length < 3) {
    return "Username must be at least 3 characters long.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return "Invalid email format.";
  }

  
  if (!password || password.length < 6) {
    return "Password must be at least 6 characters long.";
  }

  return null; 
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  const validationError = validateUserInput(username, email, password);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rowCount > 0) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
      "INSERT INTO users (name, email, password, joined) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, email, hashedPassword, new Date()]
    );

    res.status(200).json({ message: "User registered successfully", user: result.rows[0] });
  } catch (err) {
    console.error("Error during registration:", err.message);
    res.status(500).json({ error: "Registration failed" });
  }
};

module.exports = { register };
