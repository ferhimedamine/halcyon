import { gql } from 'apollo-server';

export default gql`
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
