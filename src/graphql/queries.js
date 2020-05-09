import { gql } from 'apollo-boost';

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
        $size: Int
        $search: String
        $sort: UserSortExpression
        $cursor: String
    ) {
        searchUsers(
            input: {
                size: $size
                search: $search
                sort: $sort
                cursor: $cursor
            }
        ) {
            items {
                id
                emailAddress
                firstName
                lastName
                dateOfBirth
                isLockedOut
                roles
            }
            before
            after
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
