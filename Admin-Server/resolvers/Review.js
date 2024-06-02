const db = require('../db.js');
const { resolvers: subscriptionResolvers, pubsub } = require('./Subscription.js');
const Filter = require('bad-words');

const filter = new Filter();
const resolvers = {
  Query: {
    reviews: async (_, { product_id }) => {
      if (product_id) {
        const reviews = await db.getReviewsByProductId(product_id);
        return reviews;
      } else {
        const allReviews = await db.getAllReviews();
        return allReviews;
      }
    },
    review: async (_, { review_id }) => {
      const review = await db.getReviewById(review_id);
      return review;
    },
  },
  Mutation: {
    createReview: async (_, { user_id, title, product_id, rating, content, userImage }) => {
      try {
        const blocked = filter.isProfane(content);
        const review = await db.createReview(user_id, title, product_id, rating, content, userImage, blocked);
        pubsub.publish('NEW_REVIEW', { newReview: review });
        return review;
      } catch (error) {
        console.error('Error creating review:', error);
        throw new Error(`Failed to create review. Error: ${error.message}`);
      }
    },
    updateReview: async (_, { review_id, title, rating, content, userImage }) => {
      const blocked = filter.isProfane(content);
      const review = await db.updateReview(review_id, title, rating, content, userImage, blocked);
      return review;
    },
    deleteReview: async (_, { review_id }) => {
      const deletedReviewId = await db.deleteReview(review_id);
      return deletedReviewId;
    },
    toggleBlockReview: async (_, { review_id, blocked }) => {
      const review = await db.blockReview(review_id, blocked);
      return review;
    },
  },
  Review: {
    user: async (review) => {
      const user = await db.getUserById(review.user_id);
      return user;
    },
    product: async (review) => {
      const product = await db.getProductById(review.product_id);
      return product;
    },
  },
};

module.exports = resolvers;