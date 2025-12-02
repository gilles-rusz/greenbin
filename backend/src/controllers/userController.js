const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

module.exports = {
  getAll: async (req, res) => {
    try {
      const users = await User.getAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  },

  getById: async (req, res) => {
    try {
      const user = await User.getById(req.params.id);
      if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  },

  create: async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Champs manquants" });
    }

    const hashed = await bcrypt.hash(password, 10);

    try {
      const result = await User.create({
        name,
        email,
        password: hashed,
        role: role || "user"
      });
      res.status(201).json({ message: "Utilisateur créé", id: result.insertId });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  },

  update: async (req, res) => {
    try {
      await User.update(req.params.id, req.body);
      res.json({ message: "Utilisateur mis à jour" });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  },

  delete: async (req, res) => {
    try {
      await User.delete(req.params.id);
      res.json({ message: "Utilisateur supprimé" });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  }
};
