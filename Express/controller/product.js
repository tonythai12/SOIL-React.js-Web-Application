import * as productRepository from '../data/product.js';

export async function getProducts(req, res) {
  try {
    const products = await productRepository.getAll();
    if (products && products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: 'Cannot get products' });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
