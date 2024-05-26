import db from '../db/database.js';

export async function getAll(user_id) {
  try {
    const [rows] = await db.execute(
      `SELECT 
          ci.quantity, 
          ci.cart_id,
          p.*
       FROM 
          ShoppingCart sc
       JOIN 
          CartItems ci ON sc.cart_id = ci.cart_id
       JOIN 
          Products p ON ci.product_id = p.product_id
       WHERE 
          sc.user_id = ?`,
      [user_id]
    );

    const cartItems = rows.map((row) => ({
      quantity: row.quantity,
      product_id: row.product_id,
      name: row.name,
      price: row.price,
      description: row.description,
    }));

    return cartItems;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}

export async function addProduct(user_id, product) {
  try {
    // 1. ShoppingCart에 해당 user_id가 있는지 확인
    const [cartRows] = await db.execute(
      'SELECT cart_id FROM ShoppingCart WHERE user_id = ?',
      [user_id]
    );

    let cart_id;
    const created_at = new Date(Date.now()).toISOString().split('T')[0];
    if (cartRows.length === 0) {
      // 2. user_id가 없는 경우 새로운 ShoppingCart 생성
      const [result] = await db.execute(
        'INSERT INTO ShoppingCart (user_id, created_at) VALUES (?, ?)',
        [user_id, created_at]
      );
      cart_id = result.insertId;
    } else {
      cart_id = cartRows[0].cart_id;
    }

    // 3. CartItems에 product_id와 cart_id로 새로운 항목 추가 또는 수량 업데이트
    const { product_id } = product;
    const [cartItemRows] = await db.execute(
      'SELECT quantity FROM CartItems WHERE cart_id = ? AND product_id = ?',
      [cart_id, product_id]
    );

    if (cartItemRows.length > 0) {
      // product_id가 이미 존재하면 quantity 업데이트
      await db.execute(
        'UPDATE CartItems SET quantity = quantity + ? WHERE cart_id = ? AND product_id = ?',
        [1, cart_id, product_id]
      );
      return {
        message: 'Quantity updated successfully',
        cart_id,
        product_id,
        quantity: cartItemRows[0].quantity + 1,
      };
    } else {
      // product_id가 존재하지 않으면 새로운 항목 추가
      await db.execute(
        'INSERT INTO CartItems (cart_id, product_id, quantity) VALUES (?, ?, ?)',
        [cart_id, product_id, 1]
      );
      return {
        message: 'Product added to cart successfully',
        cart_id,
        product_id,
        quantity: 1,
      };
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw new Error('Error adding product to cart');
  }
}

export async function updateProductQuantity(cart_id, product_id, delta) {
  // Check if the cart item exists
  const [rows] = await db.execute(
    'SELECT * FROM CartItems WHERE cart_id=? AND product_id=?',
    [cart_id, product_id]
  );

  if (rows.length === 0) {
    return null;
  }

  // Update the quantity of the existing cart item.
  const quantity = Math.max(1, rows[0].quantity + delta);

  const [result] = await db.execute(
    'UPDATE CartItems SET quantity=? WHERE cart_id=? AND product_id=?',
    [quantity, cart_id, product_id]
  );

  if (result.affectedRows > 0) {
    const [rows] = await db.execute(
      `SELECT p.*, ci.quantity
      FROM CartItems ci
      JOIN Products p ON ci.product_id = p.product_id
      WHERE ci.cart_id = ? AND ci.product_id = ?`,
      [cart_id, product_id]
    );

    if (rows.length > 0) {
      const updatedCartItem = rows[0];
      return updatedCartItem;
    } else {
      console.log('Cannot found updated item');
    }
  } else {
    console.log('Nothing is updated');
  }
}

export async function remove(cart_id, product_id) {
  return db.execute('DELETE CartItems WHERE cart_id=? AND product_id=?', [
    cart_id,
    product_id,
  ]);
}
