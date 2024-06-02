const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'rmit.australiaeast.cloudapp.azure.com',
  user: 's3939906_fsd_a2',
  password: 'dnjsqls12',
  database: 's3939906_fsd_a2',
  connectionLimit: 10,
  connectTimeout: 30000,
});

async function getAllUsers() {
  const [rows] = await pool.query('SELECT * FROM Users');
  return rows;
}

async function blockReview(reviewId, blocked) {
  await pool.query('UPDATE Reviews SET blocked = ? WHERE review_id = ?', [blocked, reviewId]);
  return getReviewById(reviewId);
}

async function blockUser(userId) {
  const [rows] = await pool.query(
    'UPDATE Users SET blocked = 1 WHERE user_id = ?',
    [userId]
  );
  if (rows.affectedRows === 1) {
    const [updatedUser] = await pool.query(
      'SELECT * FROM Users WHERE user_id = ?',
      [userId]
    );
    return updatedUser[0];
  }
  return null;
}

async function unblockUser(userId) {
  const [rows] = await pool.query(
    'UPDATE Users SET blocked = 0 WHERE user_id = ?',
    [userId]
  );
  if (rows.affectedRows === 1) {
    const [updatedUser] = await pool.query(
      'SELECT * FROM Users WHERE user_id = ?',
      [userId]
    );
    return updatedUser[0];
  }
  return null;
}

async function getReviewsByProductId(productId) {
  const [reviews] = await pool.query(
    'SELECT * FROM Reviews WHERE product_id = ?',
    [productId]
  );
  return reviews;
}

async function getReviewById(reviewId) {
  const [review] = await pool.query(
    'SELECT * FROM Reviews WHERE review_id = ?',
    [reviewId]
  );
  return review[0];
}

async function createReview(userId, title, productId, rating, content, userImage, blocked) {
  try {
    const [result] = await pool.query(
      'INSERT INTO Reviews (user_id, title, product_id, rating, content, userImage, blocked) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userId, title, productId, rating, content, userImage, blocked]
    );
    const review = await getReviewById(result.insertId);
    return review;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
}

async function updateReview(reviewId, title, rating, content, userImage) {
  await pool.query(
    'UPDATE Reviews SET title = ?, rating = ?, content = ?, userImage = ? WHERE review_id = ?',
    [title, rating, content, userImage, reviewId]
  );
  const review = await getReviewById(reviewId);
  return review;
}

async function deleteReview(reviewId) {
  await pool.query('DELETE FROM Reviews WHERE review_id = ?', [reviewId]);
  return reviewId;
}

async function getAllReviews() {
  const [reviews] = await pool.query('SELECT * FROM Reviews');
  return reviews;
}

async function getUserById(userId) {
  const [user] = await pool.query('SELECT * FROM Users WHERE user_id = ?', [
    userId,
  ]);
  return user[0];
}

async function getProductById(productId) {
  const [product] = await pool.query(
    'SELECT * FROM Products WHERE product_id = ?',
    [productId]
  );
  return product[0];
}

async function getAllProducts() {
  const [products] = await pool.query('SELECT * FROM Products');
  return products;
}

async function getProductById(productId) {
  const [product] = await pool.query(
    'SELECT * FROM Products WHERE product_id = ?',
    [productId]
  );
  return product[0];
}

async function createProduct(
  name,
  description,
  price,
  salePrice,
  imageUrl,
  isSpecial
) {
  const [result] = await pool.query(
    'INSERT INTO Products (name, description, price, salePrice, imageUrl, isSpecial) VALUES (?, ?, ?, ?, ?, ?)',
    [name, description, price, salePrice, imageUrl, isSpecial]
  );
  const product = await getProductById(result.insertId);
  return product;
}

async function updateProduct(
  productId,
  name,
  description,
  price,
  salePrice,
  imageUrl,
  isSpecial
) {
  await pool.query(
    'UPDATE Products SET name = ?, description = ?, price = ?, salePrice = ?, imageUrl = ?, isSpecial = ? WHERE product_id = ?',
    [name, description, price, salePrice, imageUrl, isSpecial, productId]
  );
  const product = await getProductById(productId);
  return product;
}

async function deleteProduct(productId) {
  await pool.query('DELETE FROM Products WHERE product_id = ?', [productId]);
  return productId;
}

async function getReviews(limit = null, order = null) {
  let query = 'SELECT * FROM Reviews';
  
  if (order === 'created_at_DESC') {
    query += ' ORDER BY created_at DESC';
  }
  
  if (limit !== null) {
    query += ` LIMIT ${limit}`;
  }
  
  const [reviews] = await pool.query(query);
  return reviews;
}


module.exports = {
  getAllUsers,
  blockUser,
  unblockUser,
  getReviewsByProductId,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getAllReviews,
  getUserById,
  getProductById,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getReviews,
  blockReview,
};
