const {
    getUserByEmailAddress,
    createUser,
    removeUser
} = require('../../_data/userRepository');
const { hashPassword } = require('../../_utils/password');
const config = require('../../_utils/config');

module.exports = {
    Mutation: {
        seedData: async (_, __, { pubsub }) => {
            const existing = await getUserByEmailAddress(
                config.SEED_EMAILADDRESS
            );

            if (existing) {
                await removeUser(existing);

                pubsub.publish('userUpdated', {
                    userUpdated: {
                        code: 'USER_REMOVED',
                        user: existing
                    }
                });
            }

            const result = await createUser({
                emailAddress: config.SEED_EMAILADDRESS,
                password: await hashPassword(config.SEED_PASSWORD),
                firstName: 'System',
                lastName: 'Administrator',
                dateOfBirth: new Date(1970, 0, 1).toISOString(),
                isLockedOut: false,
                roles: ['System Administrator']
            });

            pubsub.publish('userUpdated', {
                userUpdated: {
                    code: 'USER_CREATED',
                    user: result
                }
            });

            return {
                message: 'Environment seeded.',
                code: 'ENVIRONMENT_SEEDED'
            };
        }
    }
};
