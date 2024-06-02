import * as cartRepository from '../data/cart.js';

// get user's cart items.
export async function getCarts(req, res) {
  const { user_id } = req.params;

  const carts = await cartRepository.getAll(user_id);
  if (carts) {
    res.status(200).json(carts);
  } else {
    res.status(404).json({ message: 'Cannot get carts' });
  }
}

// add product to Cart DB and if it is successed, return user's Cart DB
export async function addToCart(req, res) {
  const { user_id } = req.params;
  const { product } = req.body;

  // insert to DB
  try {
    const result = await cartRepository.addProduct(user_id, product);
    // if result is successfully done, get cartProducts from DB for client and return it.
    if (result?.message) {
      const carts = await cartRepository.getAll(user_id);
      res.status(201).json({ carts, message: result?.message });
    } else {
      res.status(404).json({ message: 'Cart product is not added' });
    }
  } catch (error) {
    console.error(error.message);
  }
}

// update cart quantity
export async function updatedCartQuantity(req, res) {
  const { cart_id, product_id, delta } = req.body;

  const updatedCartProduct = await cartRepository.updateProductQuantity(
    cart_id,
    product_id,
    delta
  );
  if (updatedCartProduct) {
    res.status(200).json(updatedCartProduct);
  } else {
    res.status(404).json({ message: 'Cart quantity is not updated' });
  }
}

// delete shopping cart.
export async function deleteShoppingCart(req, res) {
  const { user_id } = req.params;
  const removed = await cartRepository.removeAll(user_id);

  if (removed) {
    res.status(204).json(removed);
  } else {
    res.status(404).json({ message: 'Cart is not successfully removed' });
  }
}

// delete cart items
export async function deleteCartItem(req, res) {
  const { cart_id, product_id } = req.body;
  const removed = await cartRepository.remove(cart_id, product_id);

  if (removed) {
    res.status(204).json(removed);
  } else {
    res.status(404).json({ message: 'Cart is not successfully removed' });
  }
}
