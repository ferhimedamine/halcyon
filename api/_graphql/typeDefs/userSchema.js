const { gql } = require('apollo-server');

module.exports = gql`
    enum UserSortExpression {
        EMAIL_ADDRESS
        EMAIL_ADDRESS_DESC
        DISPLAY_NAME
        DISPLAY_NAME_DESC
    }

    type User {
        id: ID!
        emailAddress: String!
        firstName: String!
        lastName: String!
        dateOfBirth: Date!
        isLockedOut: Boolean
        picture: String
        roles: [String]
    }

    type UserSearchResult {
        items: [User]
        page: Int!
        size: Int!
        totalPages: Int!
        totalCount: Int!
        hasNextPage: Boolean!
        hasPreviousPage: Boolean!
    }

    input CreateUserInput {
        emailAddress: String!
        password: String!
        firstName: String!
        lastName: String!
        dateOfBirth: Date!
        roles: [String]
    }

    input UpdateUserInput {
        emailAddress: String!
        firstName: String!
        lastName: String!
        dateOfBirth: Date!
        roles: [String]
    }

    type UserMutationResponse {
        message: String
        code: String
        user: User
    }

    type UserSubscriptionResponse {
        code: String
        user: User
    }

    extend type Query {
        searchUsers(
            page: Int
            size: Int
            search: String
            sort: UserSortExpression
        ): UserSearchResult
        getUserById(id: ID!): User
    }

    extend type Mutation {
        createUser(input: CreateUserInput): UserMutationResponse
        updateUser(id: ID!, input: UpdateUserInput): UserMutationResponse
        lockUser(id: ID!): UserMutationResponse
        unlockUser(id: ID!): UserMutationResponse
        deleteUser(id: ID!): UserMutationResponse
    }

    extend type Subscription {
        userUpdated: UserSubscriptionResponse
    }
`;
