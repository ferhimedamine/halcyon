import { gql } from 'apollo-server';

export default gql`
    input RegisterInput {
        emailAddress: String!
        password: String!
        firstName: String!
        lastName: String!
        dateOfBirth: DateTime!
    }

    extend type Mutation {
        register(input: RegisterInput): UserMutationResponse
        forgotPassword(emailAddress: String!): MutationResponse
        resetPassword(
            token: String!
            emailAddress: String!
            newPassword: String!
        ): UserMutationResponse
    }
`;
