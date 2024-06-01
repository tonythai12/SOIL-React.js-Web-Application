const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Review {
    review_id: ID!
    user: User!
    title: String
    product: Product!
    rating: Int!
    content: String
    userImage: String!
    blocked: Boolean!
    created_at: String!
  }

  extend type Mutation {
    createReview(user_id: ID!, title: String, product_id: ID!, rating: Int!, content: String, userImage: String, blocked: Boolean): Review!
    updateReview(review_id: ID!, title: String, rating: Int, content: String, userImage: String, blocked: Boolean): Review!
    deleteReview(review_id: ID!): ID!
  }
`;

module.exports = typeDefs;