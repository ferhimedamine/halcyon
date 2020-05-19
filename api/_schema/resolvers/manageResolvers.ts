import { ApolloError } from 'apollo-server';
import {
    getUserById,
    getUserByEmailAddress,
    updateUser,
    removeUser
} from '../../_data/userRepository';
import { Resolvers } from '../gen-types';
import { generateHash, verifyHash } from '../../_utils/hash';

export const manageResolvers: Resolvers = {
    Query: {
        getProfile: async (_, __, { payload }) => getUserById(payload!.sub)
    },
    Mutation: {
        updateProfile: async (_, { input }, { payload }) => {
            const user = await getUserById(payload!.sub);
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

            return {
                message: 'Your profile has been updated.',
                code: 'PROFILE_UPDATED',
                user
            };
        },
        changePassword: async (
            _,
            { currentPassword, newPassword },
            { payload }
        ) => {
            const user = await getUserById(payload!.sub);
            if (!user) {
                throw new ApolloError('User not found.', 'USER_NOT_FOUND');
            }

            const verified = await verifyHash(currentPassword, user.password);

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
        },
        deleteAccount: async (_, __, { payload }) => {
            const user = await getUserById(payload!.sub);
            if (!user) {
                throw new ApolloError('User not found.', 'USER_NOT_FOUND');
            }

            await removeUser(user);

            return {
                message: 'Your account has been deleted.',
                code: 'ACCOUNT_DELETED',
                user
            };
        }
    }
};
