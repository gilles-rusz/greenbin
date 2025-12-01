const Waste = require("../models/wasteModel");

module.exports = {
  // GET /wastes
  getAll: async (req, res) => {
    try {
      const wastes = await Waste.getAll();
      res.json(wastes);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  },

  // GET /wastes/:id
  getById: async (req, res) => {
    try {
      const waste = await Waste.getById(req.params.id);
      if (!waste) return res.status(404).json({ message: "Déchet introuvable" });

      res.json(waste);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  },

  // POST /wastes
  create: async (req, res) => {
    const { name, category, description } = req.body;

    if (!name || !category) {
      return res.status(400).json({ message: "Nom et catégorie obligatoires" });
    }

    try {
      const result = await Waste.create({
        name,
        category,
        description,
        user_id: req.user.id
      });

      res.status(201).json({ message: "Déchet créé", id: result.insertId });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  },

  // PUT /wastes/:id
  update: async (req, res) => {
    try {
      await Waste.update(req.params.id, req.body);
      res.json({ message: "Déchet mis à jour" });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  },

  // DELETE /wastes/:id
  delete: async (req, res) => {
    try {
      await Waste.delete(req.params.id);
      res.json({ message: "Déchet supprimé" });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  },
};
