const db = require("../config/database");

module.exports = {
  // Récupérer tous les déchets
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM wastes", (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  // Récupérer un déchet par ID
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM wastes WHERE id = ?", [id], (err, result) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  },

  // Créer un déchet
  create: (data) => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO wastes (name, category, description, user_id) VALUES (?, ?, ?, ?)";
      db.query(query, [data.name, data.category, data.description, data.user_id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  // Mettre à jour un déchet
  update: (id, data) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE wastes SET name=?, category=?, description=? WHERE id=?";
      db.query(query, [data.name, data.category, data.description, id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  // Supprimer
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM wastes WHERE id=?", [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
};
