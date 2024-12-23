const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require('jsonwebtoken');

const {handleFaceDetection} = require("./controllers/face-detection");
const {singIn} = require("./controllers/signIn");
const { register } = require("./controllers/register");
const { rankUpdate } = require("./controllers/rankUpdate");
const { rankUser } = require("./controllers/rankUser");
const { forgotPassword } = require("./controllers/forgotPassword");
const { ResetPassword } = require("./controllers/resetPassword");

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};


app.post("/api/face-detection", authenticateToken, handleFaceDetection);

app.post("/signin", singIn);

app.post("/register", register);


app.put("/image", authenticateToken, rankUpdate);

app.put('/user/rank', authenticateToken, rankUser);

app.post('/forgot-password', forgotPassword);


app.post('/reset-password', ResetPassword);

app.listen(PORT, () => {
  console.log(`Serverul rulează pe http://localhost:${PORT}`);
});
