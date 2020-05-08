const {
    getUserByEmailAddress,
    createUser,
    removeUser
} = require('../../_data/userRepository');
const { generateHash } = require('../../_utils/hash');
const { publish } = require('../../_utils/ws');
const config = require('../../_utils/config');

module.exports = {
    Mutation: {
        seedData: async () => {
            const existing = await getUserByEmailAddress(
                config.SEED_EMAILADDRESS
            );

            if (existing) {
                await removeUser(existing);

                publish('userUpdated', {
                    userUpdated: {
                        code: 'USER_REMOVED',
                        user: existing
                    }
                });
            }

            const result = await createUser({
                emailAddress: config.SEED_EMAILADDRESS,
                password: await generateHash(config.SEED_PASSWORD),
                firstName: 'System',
                lastName: 'Administrator',
                dateOfBirth: new Date(1970, 0, 1).toISOString(),
                isLockedOut: false,
                roles: ['System Administrator']
            });

            publish('userUpdated', {
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
