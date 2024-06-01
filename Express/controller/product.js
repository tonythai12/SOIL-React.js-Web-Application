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

export async function getSpecialProducts(req, res) {
  try {
    const specialProducts = await productRepository.getAllSpecial();
    console.log(`specialProducts =>`, specialProducts);
    if (specialProducts && specialProducts.length > 0) {
      res.status(200).json(specialProducts);
    } else {
      res.status(404).json({ message: 'Cannot get special products' });
    }
  } catch (error) {
    console.error('Error fetching special products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
