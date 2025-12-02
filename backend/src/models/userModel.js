const db = require("../config/database");

module.exports = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT id, name, email, role FROM users", (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT id, name, email, role FROM users WHERE id = ?", [id], (err, result) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  },

  create: (data) => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
      db.query(query, [data.name, data.email, data.password, data.role], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  update: (id, data) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE users SET name=?, email=?, role=? WHERE id=?";
      db.query(query, [data.name, data.email, data.role, id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
};
