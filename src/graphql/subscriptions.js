import gql from 'graphql-tag';

export const USER_UPDATED = gql`
    subscription UserUpdated {
        userUpdated {
            code
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
