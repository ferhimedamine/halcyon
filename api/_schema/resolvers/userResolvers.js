const { ApolloError } = require('apollo-server');
const { combineResolvers } = require('graphql-resolvers');
const {
    searchUsers,
    getUserById,
    getUserByEmailAddress,
    createUser,
    updateUser,
    removeUser
} = require('../../_data/userRepository');
const { isAuthenticated } = require('../context');
const { generateHash } = require('../../_utils/hash');
const { USER_ADMINISTRATOR } = require('../../_utils/auth');

module.exports = {
    Query: {
        searchUsers: combineResolvers(
            isAuthenticated(USER_ADMINISTRATOR),
            async (_, { input }) => searchUsers(input)
        ),
        getUserById: combineResolvers(
            isAuthenticated(USER_ADMINISTRATOR),
            async (_, { id }) => getUserById(id)
        )
    },
    Mutation: {
        createUser: combineResolvers(
            isAuthenticated(USER_ADMINISTRATOR),
            async (_, { input }) => {
                const existing = await getUserByEmailAddress(
                    input.emailAddress
                );

                if (existing) {
                    throw new ApolloError(
                        `User name "${input.emailAddress}" is already taken.`,
                        'DUPLICATE_USER'
                    );
                }

                const result = await createUser({
                    emailAddress: input.emailAddress,
                    password: await generateHash(input.password),
                    firstName: input.firstName,
                    lastName: input.lastName,
                    dateOfBirth: input.dateOfBirth.toISOString(),
                    isLockedOut: false,
                    roles: input.roles
                });

                return {
                    message: 'User successfully created.',
                    code: 'USER_CREATED',
                    user: result
                };
            }
        ),
        updateUser: combineResolvers(
            isAuthenticated(USER_ADMINISTRATOR),
            async (_, { id, input }) => {
                const user = await getUserById(id);
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
                user.roles = input.roles;
                await updateUser(user);

                return {
                    message: 'User successfully updated.',
                    code: 'USER_UPDATED',
                    user
                };
            }
        ),
        lockUser: combineResolvers(
            isAuthenticated(USER_ADMINISTRATOR),
            async (_, { id }, { payload }) => {
                const user = await getUserById(id);
                if (!user) {
                    throw new ApolloError('User not found.', 'USER_NOT_FOUND');
                }

                if (user.id === payload.sub) {
                    throw new ApolloError(
                        'Cannot lock currently logged in user.',
                        'LOCK_CURRENT_USER'
                    );
                }

                user.isLockedOut = true;
                await updateUser(user);

                return {
                    message: 'User successfully locked.',
                    code: 'USER_LOCKED',
                    user
                };
            }
        ),
        unlockUser: combineResolvers(
            isAuthenticated(USER_ADMINISTRATOR),
            async (_, { id }) => {
                const user = await getUserById(id);
                if (!user) {
                    throw new ApolloError('User not found.', 'USER_NOT_FOUND');
                }

                user.isLockedOut = false;
                await updateUser(user);

                return {
                    message: 'User successfully unlocked.',
                    code: 'USER_UNLOCKED',
                    user
                };
            }
        ),
        deleteUser: combineResolvers(
            isAuthenticated(USER_ADMINISTRATOR),
            async (_, { id }, { payload }) => {
                const user = await getUserById(id);
                if (!user) {
                    throw new ApolloError('User not found.', 'USER_NOT_FOUND');
                }

                if (user.id === payload.sub) {
                    throw new ApolloError(
                        'Cannot delete currently logged in user.',
                        'DELETE_CURRENT_USER'
                    );
                }

                await removeUser(user);

                return {
                    message: 'User successfully deleted.',
                    code: 'USER_DELETED',
                    user
                };
            }
        )
    }
};
