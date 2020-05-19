import { GraphQLDateTime } from 'graphql-iso-date';
import { Resolvers } from '../gen-types';
import { accountResolvers } from './accountResolvers';
import { manageResolvers } from './manageResolvers';
import { seedResolvers } from './seedResolvers';
import { tokenResolvers } from './tokenResolvers';
import { userResolvers } from './userResolvers';

const customScalarResolver: Resolvers = {
    DateTime: GraphQLDateTime
};

export const resolvers: Resolvers[] = [
    customScalarResolver,
    userResolvers,
    accountResolvers,
    manageResolvers,
    tokenResolvers,
    seedResolvers
];
