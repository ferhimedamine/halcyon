import { ApolloError } from 'apollo-server';
import { v4 as uuidv4 } from 'uuid';
import {
    getUserByEmailAddress,
    createUser,
    updateUser
} from '../../_data/userRepository';
import { MutationResolvers, QueryResolvers } from '../resolvers-types';
import { sendEmail } from '../../_utils/email';
import { generateHash } from '../../_utils/hash';

export interface AccountResolvers {
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
}

export const accountResolvers: AccountResolvers = {
    Mutation: {
        register: async (_, { input }) => {
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
                roles: []
            });

            return {
                message: 'User successfully registered.',
                code: 'USER_REGISTERED',
                user: result
            };
        },
        forgotPassword: async (_, { emailAddress }) => {
            const user = await getUserByEmailAddress(emailAddress);
            if (user) {
                user.passwordResetToken = uuidv4();
                await updateUser(user);

                await sendEmail({
                    to: user.emailAddress,
                    template: 'resetPassword',
                    context: {
                        token: user.passwordResetToken
                    }
                });
            }

            return {
                message:
                    'Instructions as to how to reset your password have been sent to you via email.',
                code: 'FORGOT_PASSWORD'
            };
        },
        resetPassword: async (_, { token, emailAddress, newPassword }) => {
            const user = await getUserByEmailAddress(emailAddress);
            if (!user || user.passwordResetToken !== token) {
                throw new ApolloError('Invalid token.', 'INVALID_TOKEN');
            }

            user.password = await generateHash(newPassword);
            user.passwordResetToken = undefined;
            await updateUser(user);

            return {
                message: 'Your password has been reset.',
                code: 'PASSWORD_RESET',
                user
            };
        }
    }
};
