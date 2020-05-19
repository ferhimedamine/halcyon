const { gql } = require('apollo-server');

module.exports = gql`
    input UpdateProfileInput {
        emailAddress: String!
        firstName: String!
        lastName: String!
        dateOfBirth: DateTime!
    }

    extend type Query {
        getProfile: User
    }

    extend type Mutation {
        updateProfile(input: UpdateProfileInput!): UserMutationResponse
        changePassword(
            currentPassword: String!
            newPassword: String!
        ): UserMutationResponse
        deleteAccount: UserMutationResponse
    }
`;
