const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Subscription {
    newReview: Review!
  }
`;

module.exports = typeDefs;