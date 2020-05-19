import {
    getUserByEmailAddress,
    createUser,
    removeUser
} from '../../_data/userRepository';
import { MutationResolvers, QueryResolvers } from '../resolvers-types';
import { generateHash } from '../../_utils/hash';
import { config } from '../../_utils/config';

export interface SeedResolvers {
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
}

export const seedResolvers: SeedResolvers = {
    Mutation: {
        seedData: async () => {
            const existing = await getUserByEmailAddress(
                config.SEED_EMAILADDRESS!
            );

            if (existing) {
                await removeUser(existing);
            }

            await createUser({
                emailAddress: config.SEED_EMAILADDRESS!,
                password: await generateHash(config.SEED_PASSWORD!),
                firstName: 'System',
                lastName: 'Administrator',
                dateOfBirth: new Date(1970, 0, 1).toISOString(),
                isLockedOut: false,
                roles: ['System Administrator']
            });

            return {
                message: 'Environment seeded.',
                code: 'ENVIRONMENT_SEEDED'
            };
        }
    }
};
