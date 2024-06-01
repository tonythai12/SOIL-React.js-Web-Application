const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'rmit.australiaeast.cloudapp.azure.com',
  user: 's3939906_fsd_a2',
  password: 'dnjsqls12',
  database: 's3939906_fsd_a2',
});

async function getAllUsers() {
  const [rows] = await pool.query('SELECT * FROM Users');
  return rows;
}

async function blockUser(userId) {
  const [rows] = await pool.query('UPDATE Users SET blocked = 1 WHERE user_id = ?', [userId]);
  if (rows.affectedRows === 1) {
    const [updatedUser] = await pool.query('SELECT * FROM Users WHERE user_id = ?', [userId]);
    return updatedUser[0];
  }
  return null;
}

async function unblockUser(userId) {
  const [rows] = await pool.query('UPDATE Users SET blocked = 0 WHERE user_id = ?', [userId]);
  if (rows.affectedRows === 1) {
    const [updatedUser] = await pool.query('SELECT * FROM Users WHERE user_id = ?', [userId]);
    return updatedUser[0];
  }
  return null;
}

module.exports = {
  getAllUsers,
  blockUser,
  unblockUser,
};