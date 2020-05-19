import { gql } from 'apollo-server';

export const seedSchema = gql`
    extend type Mutation {
        seedData: MutationResponse
    }
`;
