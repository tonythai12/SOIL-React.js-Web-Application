const db = require('../db.js');

const resolvers = {
  Query: {
    users: async () => {
      const users = await db.getAllUsers();
      return users;
    },
    reviews: async (_, { limit, order }) => {
      const reviews = await db.getReviews(limit, order);
      return reviews;
    },
    review: async (_, { review_id }) => {
      const review = await db.getReviewById(review_id);
      return review;
    },
    products: async () => {
      const products = await db.getAllProducts();
      return products;
    },
    product: async (_, { product_id }) => {
      const product = await db.getProductById(product_id);
      return product;
    },
  },
};

module.exports = resolvers;