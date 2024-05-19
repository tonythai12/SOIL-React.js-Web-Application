import * as cartRepository from '../data/cart.js';

export function getCarts(req, res, next) {
  const { id } = req.query;
  const carts = cartRepository.getAll(id);
  if (carts) {
    res.status(200).json(carts);
  } else {
    res.status(404).json({ message: 'Cannot get carts' });
  }
}

export function updatedCartQuantity(req, res, next) {
  const { cart_id, product_id } = req.query;
  const { quantity } = req.body;

  const carts = cartRepository.update(cart_id, product_id, quantity);
  if (carts) {
    res.status(200).json(carts);
  } else {
    res.status(404).json({ message: 'Cart quantity is not updated' });
  }
}

export function deletCart(req, res, next) {
  const { cart_id, product_id } = req.query;
  cartRepository.remove(cart_id, product_id);
  res.status(204);
}
