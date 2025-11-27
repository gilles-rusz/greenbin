const express = require("express");
const app = express();

require("dotenv").config();
const db = require("./src/config/database");

const cors = require("cors");
app.use(cors());


// Middleware pour pouvoir lire le JSON envoyé dans les requêtes
app.use(express.json());

// Route de test
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API GreenBin");
});
//Route API
app.get("/api", (req, res) => {
  res.json({ message: "Backend Ready" });
});

// Lancement du serveur
app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});
