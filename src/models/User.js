
const pool = require("../config/db");

const User = {
  // Create a new registered user
  async create({ name, email, password, role = "student" }) {
    const sql = `
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await pool.execute(sql, [
      name,
      email,
      password,
      role,
    ]);

    return result.insertId;
  },

  // Find user by email
  async findByEmail(email) {
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    return rows[0] || null;
  },

  // Find user by ID
  async findById(id) {
    const [rows] = await pool.execute(
      `SELECT id, name, email, role, googleId, createdAt
       FROM users WHERE id = ? LIMIT 1`,
      [id]
    );

    return rows[0] || null;
  },

  // Find user by Google ID
  async findByGoogleId(googleId) {
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE googleId = ? LIMIT 1",
      [googleId]
    );

    return rows[0] || null;
  },

  // Add Google ID to an existing account
  async addGoogleId(id, googleId) {
    await pool.execute(
      "UPDATE users SET googleId = ? WHERE id = ?",
      [googleId, id]
    );
  },

  // Create a Google OAuth user
  async createGoogleUser({ name, email, googleId, role = "student" }) {
    const [result] = await pool.execute(
      `INSERT INTO users (name, email, password, role, googleId)
       VALUES (?, ?, NULL, ?, ?)`,
      [name, email, role, googleId]
    );

    return result.insertId;
  },

  // List users for admin functionality
  async findAll() {
    const [rows] = await pool.execute(
      `SELECT id, name, email, role, createdAt
       FROM users ORDER BY id DESC`
    );

    return rows;
  },

  // Delete user by ID
  async deleteById(id) {
    const [result] = await pool.execute(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    return result.affectedRows > 0;
  },
};

module.exports = User;
