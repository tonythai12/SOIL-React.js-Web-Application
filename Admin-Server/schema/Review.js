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
    created_at: String!
  }
`;

module.exports = typeDefs;