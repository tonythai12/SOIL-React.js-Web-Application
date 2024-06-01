const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const queryTypeDefs = require('./schema/Query.js');
const mutationTypeDefs = require('./schema/Mutation.js');
const userTypeDefs = require('./schema/Users.js');
const userResolvers = require('./resolvers/Users.js');
const reviewTypeDefs = require('./schema/Review.js');
const reviewResolvers = require('./resolvers/Review.js');
const productTypeDefs = require('./schema/Product.js');
const productResolvers = require('./resolvers/Product.js');
const subscriptionTypeDefs = require('./schema/Subscription.js');
const subscriptionResolvers = require('./resolvers/Subscription.js');

const app = express();

const server = new ApolloServer({
  typeDefs: [queryTypeDefs, mutationTypeDefs, userTypeDefs, reviewTypeDefs, productTypeDefs, subscriptionTypeDefs],
  resolvers: [userResolvers, reviewResolvers, productResolvers, subscriptionResolvers.resolvers],
  subscriptions: {
    path: '/subscriptions',
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();