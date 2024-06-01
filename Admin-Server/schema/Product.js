const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Product {
    product_id: ID!
    name: String!
    description: String
    price: Float!
    salePrice: Float!
    imageUrl: String!
    isSpecial: Boolean!
    created_at: String!
  }

  extend type Mutation {
    createProduct(name: String!, description: String, price: Float!, salePrice: Float!, imageUrl: String!, isSpecial: Boolean!): Product!
    updateProduct(product_id: ID!, name: String, description: String, price: Float, salePrice: Float, imageUrl: String, isSpecial: Boolean): Product!
    deleteProduct(product_id: ID!): ID!
  }
`;

module.exports = typeDefs;