const db = require('../db.js');

const resolvers = {
  Query: {
    users: async () => {
      const users = await db.getAllUsers();
      return users;
    },
  },
  Mutation: {
    blockUser: async (_, { user_id }) => {
      const blockedUser = await db.blockUser(user_id);
      return blockedUser;
    },
    unblockUser: async (_, { user_id }) => {
      const unblockedUser = await db.unblockUser(user_id);
      return unblockedUser;
    },
  },
};

module.exports = resolvers;