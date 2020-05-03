import gql from 'graphql-tag';

export const GET_LOCAL_CONTEXT = gql`
    query GetLocalContext {
        accessToken @client
        currentUser @client {
            sub
            family_name
            given_name
            email
            role
        }
    }
`;

export const GET_PROFILE = gql`
    query GetProfile {
        getProfile {
            id
            emailAddress
            firstName
            lastName
            dateOfBirth
            isLockedOut
            roles
        }
    }
`;

export const SEARCH_USERS = gql`
    query SearchUsers(
        $page: Int
        $size: Int
        $search: String
        $sort: UserSortExpression
    ) {
        searchUsers(page: $page, size: $size, search: $search, sort: $sort) {
            items {
                id
                emailAddress
                firstName
                lastName
                dateOfBirth
                isLockedOut
                roles
            }
            totalCount
            hasNextPage
            hasPreviousPage
        }
    }
`;

export const GET_USER_BY_ID = gql`
    query GetUserById($id: ID!) {
        getUserById(id: $id) {
            id
            emailAddress
            firstName
            lastName
            dateOfBirth
            isLockedOut
            roles
        }
    }
`;
