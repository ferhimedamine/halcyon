import { ApolloError } from 'apollo-server';
import {
    searchUsers,
    getUserById,
    getUserByEmailAddress,
    createUser,
    updateUser,
    removeUser
} from '../../_data/userRepository';
import { Resolvers } from '../gen-types';
import { generateHash } from '../../_utils/hash';

export const userResolvers: Resolvers = {
    Query: {
        searchUsers: async (_, { input }) => searchUsers(input),
        getUserById: async (_, { id }) => getUserById(id)
    },
    Mutation: {
        createUser: async (_, { input }) => {
            const existing = await getUserByEmailAddress(input.emailAddress);

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
        },
        updateUser: async (_, { id, input }) => {
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
        },
        lockUser: async (_, { id }, { payload }) => {
            const user = await getUserById(id);
            if (!user) {
                throw new ApolloError('User not found.', 'USER_NOT_FOUND');
            }

            if (user.id === payload!.sub) {
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
        },
        unlockUser: async (_, { id }) => {
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
        },
        deleteUser: async (_, { id }, { payload }) => {
            const user = await getUserById(id);
            if (!user) {
                throw new ApolloError('User not found.', 'USER_NOT_FOUND');
            }

            if (user.id === payload!.sub) {
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
    }
};
