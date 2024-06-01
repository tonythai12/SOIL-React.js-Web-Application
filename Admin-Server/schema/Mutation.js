const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Mutation {
    blockUser(user_id: ID!): User!
    unblockUser(user_id: ID!): User!
    createReview(user_id: ID!, title: String, product_id: ID!, rating: Int!, content: String, userImage: String): Review!
    updateReview(review_id: ID!, title: String, rating: Int, content: String, userImage: String): Review!
    deleteReview(review_id: ID!): ID!
    createProduct(name: String!, description: String, price: Float!, salePrice: Float!, imageUrl: String!, isSpecial: Boolean!): Product!
    updateProduct(product_id: ID!, name: String, description: String, price: Float, salePrice: Float, imageUrl: String, isSpecial: Boolean): Product!
    deleteProduct(product_id: ID!): ID!
  }
`;

module.exports = typeDefs;