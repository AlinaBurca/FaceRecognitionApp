const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcrypt");

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", `Key ${process.env.CLARIFAI_API_KEY}`);

app.post("/api/face-detection", (req, res) => {
  const { imageUrl } = req.body;

  stub.PostModelOutputs(
    {
      user_app_id: {
        user_id: process.env.CLARIFAI_USER_ID,
        app_id: process.env.CLARIFAI_APP_ID,
      },
      model_id: "face-detection",
      inputs: [
        {
          data: {
            image: {
              url: imageUrl,
            },
          },
        },
      ],
    },
    metadata,
    (err, response) => {
      if (err) {
        console.error("Eroare API Clarifai:", err);
        return res.status(500).json({ error: "Eroare la detecția feței" });
      }

      if (response.status.code !== 10000) {
        console.error("Eroare API Clarifai:", response.status.description);
        return res.status(500).json({ error: response.status.description });
      }

      res.json(response);
    }
  );
});

app.post("/signin", (req, res) => {
  res.send("signin");
});

const storedHash =
  "$2b$10$w4pHQx1F1UbXPkiR1Yskg.pEZFl60QyXbF/9vIg7RQzQ7RW5Q/Cy."; // Hash-ul din baza de date
const enteredPassword = "parolaMeaSigura";

bcrypt.compare(enteredPassword, storedHash, (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  if (result) {
    console.log("Autentificare reușită!");
  } else {
    console.log("Parola este greșită.");
  }
});

const saltRounds = 10; // Numărul de runde pentru generarea salt-ului
const plainPassword = "parolaMeaSigura";

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Parola criptată:", hash);
  // Stochează hash-ul în baza de date
});

app.post("/register", (req, res) => {
  res.send("register");
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
});

app.post("/image", (req, res) => {
  const { id } = req.body;
});

app.listen(PORT, () => {
  console.log(`Serverul rulează pe http://localhost:${PORT}`);
});

/*
/signin -->POST = success/fail
/register -->POST = user
/profile/:userId --> GET = user
/image --> PUT -->user

*/
