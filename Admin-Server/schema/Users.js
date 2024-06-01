const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Users {
    user_id: ID!
    username: String!
    email: String!
    password_hash: String!
    created_at: String!
    blocked: Boolean!
  }

  type Query {
    users: [Users!]!
  }

  type Mutation {
    blockUser(user_id: ID!): Users!
    unblockUser(user_id: ID!): Users!
  }
`;

module.exports = typeDefs;