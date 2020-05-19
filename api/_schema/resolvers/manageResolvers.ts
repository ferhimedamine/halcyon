import { ApolloError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import {
    getUserById,
    getUserByEmailAddress,
    updateUser,
    removeUser
} from '../../_data/userRepository';
import { isAuthenticated } from '../context';
import { generateHash, verifyHash } from '../../_utils/hash';

export default {
    Query: {
        getProfile: combineResolvers(
            isAuthenticated(),
            async (_: any, __: any, { payload }: any) => getUserById(payload.sub)
        )
    },
    Mutation: {
        updateProfile: combineResolvers(
            isAuthenticated(),
            async (_: any, { input }: any, { payload }: any) => {
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

                return {
                    message: 'Your profile has been updated.',
                    code: 'PROFILE_UPDATED',
                    user
                };
            }
        ),
        changePassword: combineResolvers(
            isAuthenticated(),
            async (_: any, { currentPassword, newPassword }: any, { payload }: any) => {
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
            async (_: any, __: any, { payload }: any) => {
                const user = await getUserById(payload.sub);
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
        )
    }
};
