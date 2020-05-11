const { ApolloError } = require('apollo-server');
const { combineResolvers } = require('graphql-resolvers');
const {
    getUserById,
    getUserByEmailAddress,
    updateUser,
    removeUser
} = require('../../_data/userRepository');
const { isAuthenticated } = require('../context');
const { generateHash, verifyHash } = require('../../_utils/hash');
const { publish } = require('../../_utils/push');

module.exports = {
    Query: {
        getProfile: combineResolvers(
            isAuthenticated(),
            async (_, __, { payload }) => getUserById(payload.sub)
        )
    },
    Mutation: {
        updateProfile: combineResolvers(
            isAuthenticated(),
            async (_, { input }, { payload, socketId }) => {
                const user = await getUserById(payload.sub);
                if (!user) {
                    throw new ApolloError('User not found.', 'USER_NOT_FOUND');
                }

                if (user.emailAddress !== input.emailAddress) {
                    const existing = await getUserByEmailAddress(
                        input.emailAddress
                    );

                    if (existing) {
                        throw new ApolloError(
                            `User name "${input.emailAddress}" is already taken.`,
                            'DUPLICATE_USER'
                        );
                    }
                }

                user.emailAddress = input.emailAddress;
                user.firstName = input.firstName;
                user.lastName = input.lastName;
                user.dateOfBirth = input.dateOfBirth.toISOString();
                await updateUser(user);

                publish({
                    channel: 'private-user',
                    event: 'USER_UPDATED',
                    data: user,
                    socketId
                });

                return {
                    message: 'Your profile has been updated.',
                    code: 'PROFILE_UPDATED',
                    user
                };
            }
        ),
        changePassword: combineResolvers(
            isAuthenticated(),
            async (_, { currentPassword, newPassword }, { payload }) => {
                const user = await getUserById(payload.sub);
                if (!user) {
                    throw new ApolloError('User not found.', 'USER_NOT_FOUND');
                }

                const verified = await verifyHash(
                    currentPassword,
                    user.password
                );

                if (!verified) {
                    throw new ApolloError(
                        'Incorrect password.',
                        'INCORRECT_PASSWORD'
                    );
                }

                user.password = await generateHash(newPassword);
                user.passwordResetToken = undefined;
                await updateUser(user);

                return {
                    message: 'Your password has been changed.',
                    code: 'PASSWORD_CHANGED',
                    user
                };
            }
        ),
        deleteAccount: combineResolvers(
            isAuthenticated(),
            async (_, __, { payload, socketId }) => {
                const user = await getUserById(payload.sub);
                if (!user) {
                    throw new ApolloError('User not found.', 'USER_NOT_FOUND');
                }

                await removeUser(user);

                publish({
                    channel: 'private-user',
                    event: 'USER_REMOVED',
                    data: user,
                    socketId
                });

                return {
                    message: 'Your account has been deleted.',
                    code: 'ACCOUNT_DELETED',
                    user
                };
            }
        )
    }
};
