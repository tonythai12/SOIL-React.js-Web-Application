const db = require('../db.js');

const resolvers = {
  Query: {
    products: async () => {
      const products = await db.getAllProducts();
      return products;
    },
    product: async (_, { product_id }) => {
      const product = await db.getProductById(product_id);
      return product;
    },
  },
  Mutation: {
    createProduct: async (_, { name, description, price, salePrice, imageUrl, isSpecial }) => {
      const product = await db.createProduct(name, description, price, salePrice, imageUrl, isSpecial);
      return product;
    },
    updateProduct: async (_, { product_id, name, description, price, salePrice, imageUrl, isSpecial }) => {
      const product = await db.updateProduct(product_id, name, description, price, salePrice, imageUrl, isSpecial);
      return product;
    },
    deleteProduct: async (_, { product_id }) => {
      const deletedProductId = await db.deleteProduct(product_id);
      return deletedProductId;
    },
  },
};

module.exports = resolvers;