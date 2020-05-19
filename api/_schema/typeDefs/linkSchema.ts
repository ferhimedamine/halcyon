import { gql } from 'apollo-server';

export const linkSchema = gql`
    scalar DateTime

    type MutationResponse {
        message: String
        code: String
    }

    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }
`;
