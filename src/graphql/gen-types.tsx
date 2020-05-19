import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | undefined;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    DateTime: any;
};

export type CreateUserInput = {
    emailAddress: Scalars['String'];
    password: Scalars['String'];
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    dateOfBirth: Scalars['DateTime'];
    roles?: Maybe<Array<Scalars['String']>>;
};

export enum GrantType {
    Password = 'PASSWORD'
}

export type Mutation = {
    __typename?: 'Mutation';
    _?: Maybe<Scalars['Boolean']>;
    changePassword?: Maybe<UserMutationResponse>;
    createUser?: Maybe<UserMutationResponse>;
    deleteAccount?: Maybe<UserMutationResponse>;
    deleteUser?: Maybe<UserMutationResponse>;
    forgotPassword?: Maybe<MutationResponse>;
    generateToken?: Maybe<Token>;
    lockUser?: Maybe<UserMutationResponse>;
    register?: Maybe<UserMutationResponse>;
    resetPassword?: Maybe<UserMutationResponse>;
    seedData?: Maybe<MutationResponse>;
    unlockUser?: Maybe<UserMutationResponse>;
    updateProfile?: Maybe<UserMutationResponse>;
    updateUser?: Maybe<UserMutationResponse>;
};

export type MutationChangePasswordArgs = {
    currentPassword: Scalars['String'];
    newPassword: Scalars['String'];
};

export type MutationCreateUserArgs = {
    input?: Maybe<CreateUserInput>;
};

export type MutationDeleteUserArgs = {
    id: Scalars['ID'];
};

export type MutationForgotPasswordArgs = {
    emailAddress: Scalars['String'];
};

export type MutationGenerateTokenArgs = {
    input?: Maybe<TokenInput>;
};

export type MutationLockUserArgs = {
    id: Scalars['ID'];
};

export type MutationRegisterArgs = {
    input?: Maybe<RegisterInput>;
};

export type MutationResetPasswordArgs = {
    token: Scalars['String'];
    emailAddress: Scalars['String'];
    newPassword: Scalars['String'];
};

export type MutationUnlockUserArgs = {
    id: Scalars['ID'];
};

export type MutationUpdateProfileArgs = {
    input?: Maybe<UpdateProfileInput>;
};

export type MutationUpdateUserArgs = {
    id: Scalars['ID'];
    input?: Maybe<UpdateUserInput>;
};

export type MutationResponse = {
    __typename?: 'MutationResponse';
    message?: Maybe<Scalars['String']>;
    code?: Maybe<Scalars['String']>;
};

export type Query = {
    __typename?: 'Query';
    _?: Maybe<Scalars['Boolean']>;
    getProfile?: Maybe<User>;
    getUserById?: Maybe<User>;
    searchUsers?: Maybe<UserSearchResult>;
};

export type QueryGetUserByIdArgs = {
    id: Scalars['ID'];
};

export type QuerySearchUsersArgs = {
    input?: Maybe<SearchUserInput>;
};

export type RegisterInput = {
    emailAddress: Scalars['String'];
    password: Scalars['String'];
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    dateOfBirth: Scalars['DateTime'];
};

export type SearchUserInput = {
    size?: Maybe<Scalars['Int']>;
    search?: Maybe<Scalars['String']>;
    sort?: Maybe<UserSortExpression>;
    cursor?: Maybe<Scalars['String']>;
};

export type Token = {
    __typename?: 'Token';
    accessToken: Scalars['String'];
    expiresIn: Scalars['Int'];
};

export type TokenInput = {
    grantType: GrantType;
    emailAddress?: Maybe<Scalars['String']>;
    password?: Maybe<Scalars['String']>;
};

export type UpdateProfileInput = {
    emailAddress: Scalars['String'];
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    dateOfBirth: Scalars['DateTime'];
};

export type UpdateUserInput = {
    emailAddress: Scalars['String'];
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    dateOfBirth: Scalars['DateTime'];
    roles?: Maybe<Array<Scalars['String']>>;
};

export type User = {
    __typename?: 'User';
    id: Scalars['ID'];
    emailAddress: Scalars['String'];
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    dateOfBirth: Scalars['DateTime'];
    isLockedOut?: Maybe<Scalars['Boolean']>;
    roles?: Maybe<Array<Scalars['String']>>;
};

export type UserMutationResponse = {
    __typename?: 'UserMutationResponse';
    message?: Maybe<Scalars['String']>;
    code?: Maybe<Scalars['String']>;
    user?: Maybe<User>;
};

export type UserSearchResult = {
    __typename?: 'UserSearchResult';
    items?: Maybe<Array<User>>;
    before?: Maybe<Scalars['String']>;
    after?: Maybe<Scalars['String']>;
};

export enum UserSortExpression {
    NameAsc = 'NAME_ASC',
    NameDesc = 'NAME_DESC',
    EmailAddressAsc = 'EMAIL_ADDRESS_ASC',
    EmailAddressDesc = 'EMAIL_ADDRESS_DESC'
}

export type ChangePasswordMutationVariables = {
    currentPassword: Scalars['String'];
    newPassword: Scalars['String'];
};

export type ChangePasswordMutation = { __typename?: 'Mutation' } & {
    changePassword?: Maybe<
        { __typename?: 'UserMutationResponse' } & Pick<
            UserMutationResponse,
            'message'
        >
    >;
};

export type CreateUserMutationVariables = {
    emailAddress: Scalars['String'];
    password: Scalars['String'];
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    dateOfBirth: Scalars['DateTime'];
    roles?: Maybe<Array<Scalars['String']>>;
};

export type CreateUserMutation = { __typename?: 'Mutation' } & {
    createUser?: Maybe<
        { __typename?: 'UserMutationResponse' } & Pick<
            UserMutationResponse,
            'message'
        > & {
                user?: Maybe<
                    { __typename?: 'User' } & Pick<
                        User,
                        | 'id'
                        | 'emailAddress'
                        | 'firstName'
                        | 'lastName'
                        | 'dateOfBirth'
                        | 'isLockedOut'
                        | 'roles'
                    >
                >;
            }
    >;
};

export type DeleteAccountMutationVariables = {};

export type DeleteAccountMutation = { __typename?: 'Mutation' } & {
    deleteAccount?: Maybe<
        { __typename?: 'UserMutationResponse' } & Pick<
            UserMutationResponse,
            'message'
        >
    >;
};

export type DeleteUserMutationVariables = {
    id: Scalars['ID'];
};

export type DeleteUserMutation = { __typename?: 'Mutation' } & {
    deleteUser?: Maybe<
        { __typename?: 'UserMutationResponse' } & Pick<
            UserMutationResponse,
            'message'
        >
    >;
};

export type ForgotPasswordMutationVariables = {
    emailAddress: Scalars['String'];
};

export type ForgotPasswordMutation = { __typename?: 'Mutation' } & {
    forgotPassword?: Maybe<
        { __typename?: 'MutationResponse' } & Pick<MutationResponse, 'message'>
    >;
};

export type GenerateTokenMutationVariables = {
    grantType: GrantType;
    emailAddress: Scalars['String'];
    password: Scalars['String'];
};

export type GenerateTokenMutation = { __typename?: 'Mutation' } & {
    generateToken?: Maybe<
        { __typename?: 'Token' } & Pick<Token, 'accessToken' | 'expiresIn'>
    >;
};

export type GetProfileQueryVariables = {};

export type GetProfileQuery = { __typename?: 'Query' } & {
    getProfile?: Maybe<
        { __typename?: 'User' } & Pick<
            User,
            | 'id'
            | 'emailAddress'
            | 'firstName'
            | 'lastName'
            | 'dateOfBirth'
            | 'isLockedOut'
            | 'roles'
        >
    >;
};

export type GetUserByIdQueryVariables = {
    id: Scalars['ID'];
};

export type GetUserByIdQuery = { __typename?: 'Query' } & {
    getUserById?: Maybe<
        { __typename?: 'User' } & Pick<
            User,
            | 'id'
            | 'emailAddress'
            | 'firstName'
            | 'lastName'
            | 'dateOfBirth'
            | 'isLockedOut'
            | 'roles'
        >
    >;
};

export type LockUserMutationVariables = {
    id: Scalars['ID'];
};

export type LockUserMutation = { __typename?: 'Mutation' } & {
    lockUser?: Maybe<
        { __typename?: 'UserMutationResponse' } & Pick<
            UserMutationResponse,
            'message'
        > & {
                user?: Maybe<
                    { __typename?: 'User' } & Pick<User, 'id' | 'isLockedOut'>
                >;
            }
    >;
};

export type RegisterMutationVariables = {
    emailAddress: Scalars['String'];
    password: Scalars['String'];
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    dateOfBirth: Scalars['DateTime'];
};

export type RegisterMutation = { __typename?: 'Mutation' } & {
    register?: Maybe<
        { __typename?: 'UserMutationResponse' } & Pick<
            UserMutationResponse,
            'message'
        > & {
                user?: Maybe<
                    { __typename?: 'User' } & Pick<
                        User,
                        | 'id'
                        | 'emailAddress'
                        | 'firstName'
                        | 'lastName'
                        | 'dateOfBirth'
                        | 'isLockedOut'
                        | 'roles'
                    >
                >;
            }
    >;
};

export type ResetPasswordMutationVariables = {
    token: Scalars['String'];
    emailAddress: Scalars['String'];
    newPassword: Scalars['String'];
};

export type ResetPasswordMutation = { __typename?: 'Mutation' } & {
    resetPassword?: Maybe<
        { __typename?: 'UserMutationResponse' } & Pick<
            UserMutationResponse,
            'message'
        >
    >;
};

export type SearchUsersQueryVariables = {
    size?: Maybe<Scalars['Int']>;
    search?: Maybe<Scalars['String']>;
    sort?: Maybe<UserSortExpression>;
    cursor?: Maybe<Scalars['String']>;
};

export type SearchUsersQuery = { __typename?: 'Query' } & {
    searchUsers?: Maybe<
        { __typename?: 'UserSearchResult' } & Pick<
            UserSearchResult,
            'before' | 'after'
        > & {
                items?: Maybe<
                    Array<
                        { __typename?: 'User' } & Pick<
                            User,
                            | 'id'
                            | 'emailAddress'
                            | 'firstName'
                            | 'lastName'
                            | 'dateOfBirth'
                            | 'isLockedOut'
                            | 'roles'
                        >
                    >
                >;
            }
    >;
};

export type UnlockUserMutationVariables = {
    id: Scalars['ID'];
};

export type UnlockUserMutation = { __typename?: 'Mutation' } & {
    unlockUser?: Maybe<
        { __typename?: 'UserMutationResponse' } & Pick<
            UserMutationResponse,
            'message'
        > & {
                user?: Maybe<
                    { __typename?: 'User' } & Pick<User, 'id' | 'isLockedOut'>
                >;
            }
    >;
};

export type UpdateProfileMutationVariables = {
    emailAddress: Scalars['String'];
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    dateOfBirth: Scalars['DateTime'];
};

export type UpdateProfileMutation = { __typename?: 'Mutation' } & {
    updateProfile?: Maybe<
        { __typename?: 'UserMutationResponse' } & Pick<
            UserMutationResponse,
            'message'
        > & {
                user?: Maybe<
                    { __typename?: 'User' } & Pick<
                        User,
                        | 'id'
                        | 'emailAddress'
                        | 'firstName'
                        | 'lastName'
                        | 'dateOfBirth'
                    >
                >;
            }
    >;
};

export type UpdateUserMutationVariables = {
    id: Scalars['ID'];
    emailAddress: Scalars['String'];
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    dateOfBirth: Scalars['DateTime'];
    roles?: Maybe<Array<Scalars['String']>>;
};

export type UpdateUserMutation = { __typename?: 'Mutation' } & {
    updateUser?: Maybe<
        { __typename?: 'UserMutationResponse' } & Pick<
            UserMutationResponse,
            'message'
        > & {
                user?: Maybe<
                    { __typename?: 'User' } & Pick<
                        User,
                        | 'id'
                        | 'emailAddress'
                        | 'firstName'
                        | 'lastName'
                        | 'dateOfBirth'
                        | 'roles'
                    >
                >;
            }
    >;
};

export const ChangePasswordDocument = gql`
    mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
        changePassword(
            currentPassword: $currentPassword
            newPassword: $newPassword
        ) {
            message
        }
    }
`;
export type ChangePasswordMutationFn = ApolloReactCommon.MutationFunction<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      currentPassword: // value for 'currentPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<
        ChangePasswordMutation,
        ChangePasswordMutationVariables
    >
) {
    return ApolloReactHooks.useMutation<
        ChangePasswordMutation,
        ChangePasswordMutationVariables
    >(ChangePasswordDocument, baseOptions);
}
export type ChangePasswordMutationHookResult = ReturnType<
    typeof useChangePasswordMutation
>;
export type ChangePasswordMutationResult = ApolloReactCommon.MutationResult<
    ChangePasswordMutation
>;
export type ChangePasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
>;
export const CreateUserDocument = gql`
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
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<
    CreateUserMutation,
    CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      emailAddress: // value for 'emailAddress'
 *      password: // value for 'password'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      dateOfBirth: // value for 'dateOfBirth'
 *      roles: // value for 'roles'
 *   },
 * });
 */
export function useCreateUserMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<
        CreateUserMutation,
        CreateUserMutationVariables
    >
) {
    return ApolloReactHooks.useMutation<
        CreateUserMutation,
        CreateUserMutationVariables
    >(CreateUserDocument, baseOptions);
}
export type CreateUserMutationHookResult = ReturnType<
    typeof useCreateUserMutation
>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<
    CreateUserMutation
>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
    CreateUserMutation,
    CreateUserMutationVariables
>;
export const DeleteAccountDocument = gql`
    mutation DeleteAccount {
        deleteAccount {
            message
        }
    }
`;
export type DeleteAccountMutationFn = ApolloReactCommon.MutationFunction<
    DeleteAccountMutation,
    DeleteAccountMutationVariables
>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteAccountMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<
        DeleteAccountMutation,
        DeleteAccountMutationVariables
    >
) {
    return ApolloReactHooks.useMutation<
        DeleteAccountMutation,
        DeleteAccountMutationVariables
    >(DeleteAccountDocument, baseOptions);
}
export type DeleteAccountMutationHookResult = ReturnType<
    typeof useDeleteAccountMutation
>;
export type DeleteAccountMutationResult = ApolloReactCommon.MutationResult<
    DeleteAccountMutation
>;
export type DeleteAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<
    DeleteAccountMutation,
    DeleteAccountMutationVariables
>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: ID!) {
        deleteUser(id: $id) {
            message
        }
    }
`;
export type DeleteUserMutationFn = ApolloReactCommon.MutationFunction<
    DeleteUserMutation,
    DeleteUserMutationVariables
>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<
        DeleteUserMutation,
        DeleteUserMutationVariables
    >
) {
    return ApolloReactHooks.useMutation<
        DeleteUserMutation,
        DeleteUserMutationVariables
    >(DeleteUserDocument, baseOptions);
}
export type DeleteUserMutationHookResult = ReturnType<
    typeof useDeleteUserMutation
>;
export type DeleteUserMutationResult = ApolloReactCommon.MutationResult<
    DeleteUserMutation
>;
export type DeleteUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
    DeleteUserMutation,
    DeleteUserMutationVariables
>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($emailAddress: String!) {
        forgotPassword(emailAddress: $emailAddress) {
            message
        }
    }
`;
export type ForgotPasswordMutationFn = ApolloReactCommon.MutationFunction<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      emailAddress: // value for 'emailAddress'
 *   },
 * });
 */
export function useForgotPasswordMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<
        ForgotPasswordMutation,
        ForgotPasswordMutationVariables
    >
) {
    return ApolloReactHooks.useMutation<
        ForgotPasswordMutation,
        ForgotPasswordMutationVariables
    >(ForgotPasswordDocument, baseOptions);
}
export type ForgotPasswordMutationHookResult = ReturnType<
    typeof useForgotPasswordMutation
>;
export type ForgotPasswordMutationResult = ApolloReactCommon.MutationResult<
    ForgotPasswordMutation
>;
export type ForgotPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
>;
export const GenerateTokenDocument = gql`
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
export type GenerateTokenMutationFn = ApolloReactCommon.MutationFunction<
    GenerateTokenMutation,
    GenerateTokenMutationVariables
>;

/**
 * __useGenerateTokenMutation__
 *
 * To run a mutation, you first call `useGenerateTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateTokenMutation, { data, loading, error }] = useGenerateTokenMutation({
 *   variables: {
 *      grantType: // value for 'grantType'
 *      emailAddress: // value for 'emailAddress'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGenerateTokenMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<
        GenerateTokenMutation,
        GenerateTokenMutationVariables
    >
) {
    return ApolloReactHooks.useMutation<
        GenerateTokenMutation,
        GenerateTokenMutationVariables
    >(GenerateTokenDocument, baseOptions);
}
export type GenerateTokenMutationHookResult = ReturnType<
    typeof useGenerateTokenMutation
>;
export type GenerateTokenMutationResult = ApolloReactCommon.MutationResult<
    GenerateTokenMutation
>;
export type GenerateTokenMutationOptions = ApolloReactCommon.BaseMutationOptions<
    GenerateTokenMutation,
    GenerateTokenMutationVariables
>;
export const GetProfileDocument = gql`
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

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfileQuery(
    baseOptions?: ApolloReactHooks.QueryHookOptions<
        GetProfileQuery,
        GetProfileQueryVariables
    >
) {
    return ApolloReactHooks.useQuery<GetProfileQuery, GetProfileQueryVariables>(
        GetProfileDocument,
        baseOptions
    );
}
export function useGetProfileLazyQuery(
    baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
        GetProfileQuery,
        GetProfileQueryVariables
    >
) {
    return ApolloReactHooks.useLazyQuery<
        GetProfileQuery,
        GetProfileQueryVariables
    >(GetProfileDocument, baseOptions);
}
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<
    typeof useGetProfileLazyQuery
>;
export type GetProfileQueryResult = ApolloReactCommon.QueryResult<
    GetProfileQuery,
    GetProfileQueryVariables
>;
export const GetUserByIdDocument = gql`
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

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserByIdQuery(
    baseOptions?: ApolloReactHooks.QueryHookOptions<
        GetUserByIdQuery,
        GetUserByIdQueryVariables
    >
) {
    return ApolloReactHooks.useQuery<
        GetUserByIdQuery,
        GetUserByIdQueryVariables
    >(GetUserByIdDocument, baseOptions);
}
export function useGetUserByIdLazyQuery(
    baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
        GetUserByIdQuery,
        GetUserByIdQueryVariables
    >
) {
    return ApolloReactHooks.useLazyQuery<
        GetUserByIdQuery,
        GetUserByIdQueryVariables
    >(GetUserByIdDocument, baseOptions);
}
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<
    typeof useGetUserByIdLazyQuery
>;
export type GetUserByIdQueryResult = ApolloReactCommon.QueryResult<
    GetUserByIdQuery,
    GetUserByIdQueryVariables
>;
export const LockUserDocument = gql`
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
export type LockUserMutationFn = ApolloReactCommon.MutationFunction<
    LockUserMutation,
    LockUserMutationVariables
>;

/**
 * __useLockUserMutation__
 *
 * To run a mutation, you first call `useLockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [lockUserMutation, { data, loading, error }] = useLockUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLockUserMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<
        LockUserMutation,
        LockUserMutationVariables
    >
) {
    return ApolloReactHooks.useMutation<
        LockUserMutation,
        LockUserMutationVariables
    >(LockUserDocument, baseOptions);
}
export type LockUserMutationHookResult = ReturnType<typeof useLockUserMutation>;
export type LockUserMutationResult = ApolloReactCommon.MutationResult<
    LockUserMutation
>;
export type LockUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
    LockUserMutation,
    LockUserMutationVariables
>;
export const RegisterDocument = gql`
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
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<
    RegisterMutation,
    RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      emailAddress: // value for 'emailAddress'
 *      password: // value for 'password'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      dateOfBirth: // value for 'dateOfBirth'
 *   },
 * });
 */
export function useRegisterMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<
        RegisterMutation,
        RegisterMutationVariables
    >
) {
    return ApolloReactHooks.useMutation<
        RegisterMutation,
        RegisterMutationVariables
    >(RegisterDocument, baseOptions);
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<
    RegisterMutation
>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<
    RegisterMutation,
    RegisterMutationVariables
>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword(
        $token: String!
        $emailAddress: String!
        $newPassword: String!
    ) {
        resetPassword(
            token: $token
            emailAddress: $emailAddress
            newPassword: $newPassword
        ) {
            message
        }
    }
`;
export type ResetPasswordMutationFn = ApolloReactCommon.MutationFunction<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      emailAddress: // value for 'emailAddress'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useResetPasswordMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<
        ResetPasswordMutation,
        ResetPasswordMutationVariables
    >
) {
    return ApolloReactHooks.useMutation<
        ResetPasswordMutation,
        ResetPasswordMutationVariables
    >(ResetPasswordDocument, baseOptions);
}
export type ResetPasswordMutationHookResult = ReturnType<
    typeof useResetPasswordMutation
>;
export type ResetPasswordMutationResult = ApolloReactCommon.MutationResult<
    ResetPasswordMutation
>;
export type ResetPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
>;
export const SearchUsersDocument = gql`
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

/**
 * __useSearchUsersQuery__
 *
 * To run a query within a React component, call `useSearchUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUsersQuery({
 *   variables: {
 *      size: // value for 'size'
 *      search: // value for 'search'
 *      sort: // value for 'sort'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useSearchUsersQuery(
    baseOptions?: ApolloReactHooks.QueryHookOptions<
        SearchUsersQuery,
        SearchUsersQueryVariables
    >
) {
    return ApolloReactHooks.useQuery<
        SearchUsersQuery,
        SearchUsersQueryVariables
    >(SearchUsersDocument, baseOptions);
}
export function useSearchUsersLazyQuery(
    baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
        SearchUsersQuery,
        SearchUsersQueryVariables
    >
) {
    return ApolloReactHooks.useLazyQuery<
        SearchUsersQuery,
        SearchUsersQueryVariables
    >(SearchUsersDocument, baseOptions);
}
export type SearchUsersQueryHookResult = ReturnType<typeof useSearchUsersQuery>;
export type SearchUsersLazyQueryHookResult = ReturnType<
    typeof useSearchUsersLazyQuery
>;
export type SearchUsersQueryResult = ApolloReactCommon.QueryResult<
    SearchUsersQuery,
    SearchUsersQueryVariables
>;
export const UnlockUserDocument = gql`
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
export type UnlockUserMutationFn = ApolloReactCommon.MutationFunction<
    UnlockUserMutation,
    UnlockUserMutationVariables
>;

/**
 * __useUnlockUserMutation__
 *
 * To run a mutation, you first call `useUnlockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlockUserMutation, { data, loading, error }] = useUnlockUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnlockUserMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<
        UnlockUserMutation,
        UnlockUserMutationVariables
    >
) {
    return ApolloReactHooks.useMutation<
        UnlockUserMutation,
        UnlockUserMutationVariables
    >(UnlockUserDocument, baseOptions);
}
export type UnlockUserMutationHookResult = ReturnType<
    typeof useUnlockUserMutation
>;
export type UnlockUserMutationResult = ApolloReactCommon.MutationResult<
    UnlockUserMutation
>;
export type UnlockUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
    UnlockUserMutation,
    UnlockUserMutationVariables
>;
export const UpdateProfileDocument = gql`
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
export type UpdateProfileMutationFn = ApolloReactCommon.MutationFunction<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      emailAddress: // value for 'emailAddress'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      dateOfBirth: // value for 'dateOfBirth'
 *   },
 * });
 */
export function useUpdateProfileMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<
        UpdateProfileMutation,
        UpdateProfileMutationVariables
    >
) {
    return ApolloReactHooks.useMutation<
        UpdateProfileMutation,
        UpdateProfileMutationVariables
    >(UpdateProfileDocument, baseOptions);
}
export type UpdateProfileMutationHookResult = ReturnType<
    typeof useUpdateProfileMutation
>;
export type UpdateProfileMutationResult = ApolloReactCommon.MutationResult<
    UpdateProfileMutation
>;
export type UpdateProfileMutationOptions = ApolloReactCommon.BaseMutationOptions<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
>;
export const UpdateUserDocument = gql`
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
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<
    UpdateUserMutation,
    UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      emailAddress: // value for 'emailAddress'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      dateOfBirth: // value for 'dateOfBirth'
 *      roles: // value for 'roles'
 *   },
 * });
 */
export function useUpdateUserMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<
        UpdateUserMutation,
        UpdateUserMutationVariables
    >
) {
    return ApolloReactHooks.useMutation<
        UpdateUserMutation,
        UpdateUserMutationVariables
    >(UpdateUserDocument, baseOptions);
}
export type UpdateUserMutationHookResult = ReturnType<
    typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<
    UpdateUserMutation
>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
>;
