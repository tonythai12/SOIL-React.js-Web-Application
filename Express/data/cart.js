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
      cart_id: row.cart_id,
      quantity: row.quantity,
      product_id: row.product_id,
      image_url: row.imageUrl,
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

// Unit Test ✅ :
export async function addProduct(user_id, product) {
  try {
    // 1. Check if the user_id exists in the ShoppingCart
    const [cartRows] = await db.execute(
      'SELECT cart_id FROM ShoppingCart WHERE user_id = ?',
      [user_id]
    );

    let cart_id;
    const created_at = new Date(Date.now()).toISOString().split('T')[0];
    if (cartRows.length === 0) {
      // 2. If the user_id does not exist, create a new ShoppingCart
      const [result] = await db.execute(
        'INSERT INTO ShoppingCart (user_id, created_at) VALUES (?, ?)',
        [user_id, created_at]
      );
      cart_id = result.insertId;
    } else {
      cart_id = cartRows[0].cart_id;
    }

    // 3. Add a new item to CartItems with product_id and cart_id, or update the quantity
    const { product_id } = product;
    const [cartItemRows] = await db.execute(
      'SELECT quantity FROM CartItems WHERE cart_id = ? AND product_id = ?',
      [cart_id, product_id]
    );

    if (cartItemRows.length > 0) {
      // If the product_id already exists, update the quantity
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
      // If the product_id does not exist, add a new item
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

// Unit Test ✅ :
export async function updateProductQuantity(cart_id, product_id, delta) {
  // Check if the cart item exists
  const [rows] = await db.execute(
    'SELECT * FROM CartItems WHERE cart_id=? AND product_id=?',
    [cart_id, product_id]
  );

  // If the cart item does not exist, return null
  if (rows.length === 0) {
    return null;
  }

  // Update the quantity of the existing cart item.
  const quantity = Math.max(1, rows[0].quantity + delta);

  // Execute SQL query to update the quantity of the cart item
  const [result] = await db.execute(
    'UPDATE CartItems SET quantity=? WHERE cart_id=? AND product_id=?',
    [quantity, cart_id, product_id]
  );

  // If the update query affected rows, fetch the updated cart item
  if (result.affectedRows > 0) {
    const [rows] = await db.execute(
      `SELECT p.*, ci.quantity
      FROM CartItems ci
      JOIN Products p ON ci.product_id = p.product_id
      WHERE ci.cart_id = ? AND ci.product_id = ?`,
      [cart_id, product_id]
    );

    // If the updated cart item is found, return it
    if (rows.length > 0) {
      const updatedCartItem = rows[0];
      return updatedCartItem;
    } else {
      // Log an error message if the updated item is not found
      console.log('Cannot found updated item');
    }
  } else {
    // Log a message if nothing is updated
    console.log('Nothing is updated');
  }
}

export async function removeAll(user_id) {
  return db.execute('DELETE FROM ShoppingCart WHERE user_id=?', [user_id]);
}

// Unit Test ✅ :
export async function remove(cart_id, product_id) {
  return db.execute('DELETE FROM CartItems WHERE cart_id=? AND product_id=?', [
    cart_id,
    product_id,
  ]);
}
