import * as cartRepository from '../data/cart.js';

export function getCarts(req, res) {
  const { user_id } = req.params;
  const carts = cartRepository.getAll(user_id);
  if (carts) {
    res.status(200).json(carts);
  } else {
    res.status(404).json({ message: 'Cannot get carts' });
  }
}

export async function addToCart(req, res) {
  const { user_id } = req.params;
  const { product } = req.body;

  // insert to DB
  try {
    const result = await cartRepository.addProduct(user_id, product);
    // if result is successfully done, get cartProducts from DB for client and return it.
    if (result.message) {
      const carts = cartRepository.getAll(user_id);
      res.status(201).json(carts);
    } else {
      res.status(404).json({ message: 'Cart product is not added' });
    }
  } catch (error) {
    console.error(error.message);
  }
}

export function updatedCartQuantity(req, res) {
  const { cart_id, product_id, quantity } = req.body;

  const carts = cartRepository.update(cart_id, product_id, quantity);
  if (carts) {
    res.status(200).json(carts);
  } else {
    res.status(404).json({ message: 'Cart quantity is not updated' });
  }
}

export function deleteCart(req, res) {
  const { cart_id, product_id } = req.body;
  cartRepository.remove(cart_id, product_id);
  res.status(204);
}
