import { gql } from 'apollo-boost';

export const GENERATE_TOKEN = gql`
    mutation GenerateToken(
        $grantType: GrantType!
        $emailAddress: String!
        $password: String!
    ) {
        generateToken(
            input: {
                grantType: $grantType
                emailAddress: $emailAddress
                password: $password
            }
        ) {
            accessToken
            expiresIn
        }
    }
`;

export const REGISTER = gql`
    mutation Register(
        $emailAddress: String!
        $password: String!
        $firstName: String!
        $lastName: String!
        $dateOfBirth: DateTime!
    ) {
        register(
            input: {
                emailAddress: $emailAddress
                password: $password
                firstName: $firstName
                lastName: $lastName
                dateOfBirth: $dateOfBirth
            }
        ) {
            message
            user {
                id
                emailAddress
                firstName
                lastName
                dateOfBirth
                isLockedOut
                roles
            }
        }
    }
`;

export const FORGOT_PASSWORD = gql`
    mutation ForgotPassword($emailAddress: String!) {
        forgotPassword(emailAddress: $emailAddress) {
            message
        }
    }
`;

export const RESET_PASSWORD = gql`
    mutation ResetPassword(
        $token: String!
        $emailAddress: String!
        $newPassword: String!
    ) {
        resetPassword(
            input: {
                token: $token
                emailAddress: $emailAddress
                newPassword: $newPassword
            }
        ) {
            message
        }
    }
`;

export const UPDATE_PROFILE = gql`
    mutation UpdateProfile(
        $emailAddress: String!
        $firstName: String!
        $lastName: String!
        $dateOfBirth: DateTime!
    ) {
        updateProfile(
            input: {
                emailAddress: $emailAddress
                firstName: $firstName
                lastName: $lastName
                dateOfBirth: $dateOfBirth
            }
        ) {
            message
            user {
                id
                emailAddress
                firstName
                lastName
                dateOfBirth
            }
        }
    }
`;

export const CHANGE_PASSWORD = gql`
    mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
        changePassword(
            input: {
                currentPassword: $currentPassword
                newPassword: $newPassword
            }
        ) {
            message
        }
    }
`;

export const DELETE_ACCOUNT = gql`
    mutation DeleteAccount {
        deleteAccount {
            message
        }
    }
`;

export const CREATE_USER = gql`
    mutation CreateUser(
        $emailAddress: String!
        $password: String!
        $firstName: String!
        $lastName: String!
        $dateOfBirth: DateTime!
        $roles: [String!]
    ) {
        createUser(
            input: {
                emailAddress: $emailAddress
                password: $password
                firstName: $firstName
                lastName: $lastName
                dateOfBirth: $dateOfBirth
                roles: $roles
            }
        ) {
            message
            user {
                id
                emailAddress
                firstName
                lastName
                dateOfBirth
                isLockedOut
                roles
            }
        }
    }
`;

export const UPDATE_USER = gql`
    mutation UpdateUser(
        $id: ID!
        $emailAddress: String!
        $firstName: String!
        $lastName: String!
        $dateOfBirth: DateTime!
        $roles: [String!]
    ) {
        updateUser(
            id: $id
            input: {
                emailAddress: $emailAddress
                firstName: $firstName
                lastName: $lastName
                dateOfBirth: $dateOfBirth
                roles: $roles
            }
        ) {
            message
            user {
                id
                emailAddress
                firstName
                lastName
                dateOfBirth
                roles
            }
        }
    }
`;

export const LOCK_USER = gql`
    mutation LockUser($id: ID!) {
        lockUser(id: $id) {
            message
            user {
                id
                isLockedOut
            }
        }
    }
`;

export const UNLOCK_USER = gql`
    mutation UnlockUser($id: ID!) {
        unlockUser(id: $id) {
            message
            user {
                id
                isLockedOut
            }
        }
    }
`;

export const DELETE_USER = gql`
    mutation DeleteUser($id: ID!) {
        deleteUser(id: $id) {
            message
        }
    }
`;
