const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    users: [User!]!
    reviews(limit: Int, order: String): [Review!]!
    review(review_id: ID!): Review!
    products: [Product!]!
    product(product_id: ID!): Product!
  }
`;

module.exports = typeDefs;