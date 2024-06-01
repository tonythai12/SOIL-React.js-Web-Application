const db = require('../db.js');
const { resolvers: subscriptionResolvers, pubsub } = require('./Subscription.js');

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
    createReview: async (_, { user_id, title, product_id, rating, content, userImage, blocked = false }) => {
      try {
        const review = await db.createReview(user_id, title, product_id, rating, content, userImage, blocked);
        pubsub.publish('NEW_REVIEW', { newReview: review });
        return review;
      } catch (error) {
        console.error('Error creating review:', error);
        throw new Error(`Failed to create review. Error: ${error.message}`);
      }
    },
    updateReview: async (_, { review_id, title, rating, content, userImage }) => {
      const review = await db.updateReview(review_id, title, rating, content, userImage);
      return review;
    },
    deleteReview: async (_, { review_id }) => {
      const deletedReviewId = await db.deleteReview(review_id);
      return deletedReviewId;
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