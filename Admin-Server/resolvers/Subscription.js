const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const resolvers = {
  Subscription: {
    newReview: {
      subscribe: () => pubsub.asyncIterator(['NEW_REVIEW']),
    },
  },
};

module.exports = resolvers;