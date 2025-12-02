const db = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  // ------------ REGISTER ------------
  register: (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires" });
    }

    const checkUser = "SELECT id FROM users WHERE email = ?";
    db.query(checkUser, [email], async (err, result) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", err });

      if (result.length > 0) {
        return res.status(400).json({ message: "Cet email existe déjà" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const insertUser = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
      db.query(insertUser, [name, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ message: "Erreur d'inscription", err });

        res.status(201).json({ message: "Utilisateur créé avec succès" });
      });
    });
  },

  // ------------ LOGIN ------------
  login: (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], async (err, result) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", err });

      if (result.length === 0) {
        return res.status(400).json({ message: "Email incorrect" });
      }

      const user = result[0];

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Mot de passe incorrect" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );


      res.json({
        message: "Connexion réussie",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    });
  },

  // ------------ ME ------------
  me: (req, res) => {
    const query = "SELECT id, name, email FROM users WHERE id = ?";

    db.query(query, [req.user.id], (err, result) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", err });

      if (result.length === 0) {
        return res.status(404).json({ message: "Utilisateur introuvable" });
      }

      res.json({
        message: "Profil récupéré avec succès",
        user: result[0]
      });
    });
  }

};
