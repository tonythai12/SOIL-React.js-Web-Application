import * as productRepository from '../data/product.js';
import * as reviewRepository from '../data/review.js';

// get products and add bestReviews array to products.
export async function getProducts(req, res) {
  try {
    const products = await productRepository.getAll();
    if (products && products.length > 0) {
      for (const product of products) {
        const bestReviews = await reviewRepository.geAllByRating(
          product.product_id
        );
        product.bestReviews = bestReviews;
      }
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: 'Cannot get products' });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// get special products and add bestReviews array to products.
export async function getSpecialProducts(req, res) {
  try {
    const specialProducts = await productRepository.getAllSpecial();

    if (specialProducts && specialProducts.length > 0) {
      for (const product of specialProducts) {
        const bestReviews = await reviewRepository.geAllByRating(
          product.product_id
        );
        product.bestReviews = bestReviews;
      }
      res.status(200).json(specialProducts);
    } else {
      res.status(404).json({ message: 'Cannot get special products' });
    }
  } catch (error) {
    console.error('Error fetching special products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
