const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    user_id: ID!
    username: String!
    email: String!
    password_hash: String!
    created_at: String!
    blocked: Boolean!
  }
`;

module.exports = typeDefs;