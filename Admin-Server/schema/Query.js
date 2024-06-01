const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    users: [User!]!
    reviews(product_id: ID): [Review!]!
    review(review_id: ID!): Review!
    products: [Product!]!
    product(product_id: ID!): Product!
  }
`;

module.exports = typeDefs;