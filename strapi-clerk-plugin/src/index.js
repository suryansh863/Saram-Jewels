const { clerkClient } = require('@clerk/clerk-sdk-node');
const jwt = require('jsonwebtoken');

module.exports = ({ strapi }) => ({
  async verifyClerkToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.CLERK_JWT_PUBLIC_KEY, {
        algorithms: ['RS256'],
      });
      
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  },

  async syncUserWithClerk(clerkUserId) {
    try {
      const clerkUser = await clerkClient.users.getUser(clerkUserId);
      
      // Check if user exists in Strapi
      const existingUser = await strapi.entityService.findMany('api::user.user', {
        filters: { clerk_user_id: clerkUserId },
      });

      if (existingUser.length > 0) {
        // Update existing user
        return await strapi.entityService.update('api::user.user', existingUser[0].id, {
          data: {
            email: clerkUser.emailAddresses[0]?.emailAddress,
            first_name: clerkUser.firstName,
            last_name: clerkUser.lastName,
            phone: clerkUser.phoneNumbers[0]?.phoneNumber,
          },
        });
      } else {
        // Create new user
        return await strapi.entityService.create('api::user.user', {
          data: {
            clerk_user_id: clerkUserId,
            email: clerkUser.emailAddresses[0]?.emailAddress,
            first_name: clerkUser.firstName,
            last_name: clerkUser.lastName,
            phone: clerkUser.phoneNumbers[0]?.phoneNumber,
            publishedAt: new Date(),
          },
        });
      }
    } catch (error) {
      strapi.log.error('Error syncing user with Clerk:', error);
      throw error;
    }
  },

  async authenticateClerkUser(ctx) {
    try {
      const authHeader = ctx.request.header.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('No valid authorization header');
      }

      const token = authHeader.substring(7);
      const decoded = await this.verifyClerkToken(token);
      
      // Sync user with Strapi
      const user = await this.syncUserWithClerk(decoded.sub);
      
      return user;
    } catch (error) {
      strapi.log.error('Clerk authentication error:', error);
      throw error;
    }
  },
});

