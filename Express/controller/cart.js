import * as cartRepository from '../data/cart.js';

export async function getCarts(req, res) {
  const { user_id } = req.params;
  console.log(`userId =>`, user_id);
  const carts = await cartRepository.getAll(user_id);
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
    if (result?.message) {
      const carts = await cartRepository.getAll(user_id);
      console.log(`carts =>`, carts);
      res.status(201).json({ carts, message: result?.message });
    } else {
      res.status(404).json({ message: 'Cart product is not added' });
    }
  } catch (error) {
    console.error(error.message);
  }
}

export function updatedCartQuantity(req, res) {
  const { cart_id, product_id, delta } = req.body;

  const updatedCartProduct = cartRepository.updateProductQuantity(
    cart_id,
    product_id,
    delta
  );
  if (carts) {
    res.status(200).json(updatedCartProduct);
  } else {
    res.status(404).json({ message: 'Cart quantity is not updated' });
  }
}

export function deleteCart(req, res) {
  const { cart_id, product_id } = req.body;
  cartRepository.remove(cart_id, product_id);
  res.status(204);
}
