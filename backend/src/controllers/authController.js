const db = require("../config/database");
const bcrypt = require("bcryptjs");

module.exports = {
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
  }
};
