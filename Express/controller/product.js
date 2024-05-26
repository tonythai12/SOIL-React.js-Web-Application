import * as productRepository from '../data/product.js';

export function getProducts(req, res, next) {
  const products = productRepository.getAll();
  if (products.length > 0) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: 'Cannot get products' });
  }
}
