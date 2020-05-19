import {
    GraphQLResolveInfo,
    GraphQLScalarType,
    GraphQLScalarTypeConfig
} from 'graphql';
import { Context } from './context';
export type Maybe<T> = T | undefined;
export type RequireFields<T, K extends keyof T> = {
    [X in Exclude<keyof T, K>]?: T[X];
} &
    { [P in K]-?: NonNullable<T[P]> };
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
    fragment: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
    | ResolverFn<TResult, TParent, TContext, TArgs>
    | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
    TResult,
    TKey extends string,
    TParent,
    TContext,
    TArgs
> {
    subscribe: SubscriptionSubscribeFn<
        { [key in TKey]: TResult },
        TParent,
        TContext,
        TArgs
    >;
    resolve?: SubscriptionResolveFn<
        TResult,
        { [key in TKey]: TResult },
        TContext,
        TArgs
    >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
    TResult,
    TKey extends string,
    TParent,
    TContext,
    TArgs
> =
    | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
    | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
    TResult,
    TKey extends string,
    TParent = {},
    TContext = {},
    TArgs = {}
> =
    | ((
          ...args: any[]
      ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
    | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
    parent: TParent,
    context: TContext,
    info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (
    obj: T,
    info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
    TResult = {},
    TParent = {},
    TContext = {},
    TArgs = {}
> = (
    next: NextResolverFn<TResult>,
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
    Query: ResolverTypeWrapper<{}>;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    User: ResolverTypeWrapper<User>;
    ID: ResolverTypeWrapper<Scalars['ID']>;
    String: ResolverTypeWrapper<Scalars['String']>;
    DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
    SearchUserInput: SearchUserInput;
    Int: ResolverTypeWrapper<Scalars['Int']>;
    UserSortExpression: UserSortExpression;
    UserSearchResult: ResolverTypeWrapper<UserSearchResult>;
    Mutation: ResolverTypeWrapper<{}>;
    UserMutationResponse: ResolverTypeWrapper<UserMutationResponse>;
    CreateUserInput: CreateUserInput;
    MutationResponse: ResolverTypeWrapper<MutationResponse>;
    TokenInput: TokenInput;
    GrantType: GrantType;
    Token: ResolverTypeWrapper<Token>;
    RegisterInput: RegisterInput;
    UpdateProfileInput: UpdateProfileInput;
    UpdateUserInput: UpdateUserInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
    Query: {};
    Boolean: Scalars['Boolean'];
    User: User;
    ID: Scalars['ID'];
    String: Scalars['String'];
    DateTime: Scalars['DateTime'];
    SearchUserInput: SearchUserInput;
    Int: Scalars['Int'];
    UserSortExpression: UserSortExpression;
    UserSearchResult: UserSearchResult;
    Mutation: {};
    UserMutationResponse: UserMutationResponse;
    CreateUserInput: CreateUserInput;
    MutationResponse: MutationResponse;
    TokenInput: TokenInput;
    GrantType: GrantType;
    Token: Token;
    RegisterInput: RegisterInput;
    UpdateProfileInput: UpdateProfileInput;
    UpdateUserInput: UpdateUserInput;
}>;

export interface DateTimeScalarConfig
    extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
    name: 'DateTime';
}

export type MutationResolvers<
    ContextType = Context,
    ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
    _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    changePassword?: Resolver<
        Maybe<ResolversTypes['UserMutationResponse']>,
        ParentType,
        ContextType,
        RequireFields<
            MutationChangePasswordArgs,
            'currentPassword' | 'newPassword'
        >
    >;
    createUser?: Resolver<
        Maybe<ResolversTypes['UserMutationResponse']>,
        ParentType,
        ContextType,
        RequireFields<MutationCreateUserArgs, never>
    >;
    deleteAccount?: Resolver<
        Maybe<ResolversTypes['UserMutationResponse']>,
        ParentType,
        ContextType
    >;
    deleteUser?: Resolver<
        Maybe<ResolversTypes['UserMutationResponse']>,
        ParentType,
        ContextType,
        RequireFields<MutationDeleteUserArgs, 'id'>
    >;
    forgotPassword?: Resolver<
        Maybe<ResolversTypes['MutationResponse']>,
        ParentType,
        ContextType,
        RequireFields<MutationForgotPasswordArgs, 'emailAddress'>
    >;
    generateToken?: Resolver<
        Maybe<ResolversTypes['Token']>,
        ParentType,
        ContextType,
        RequireFields<MutationGenerateTokenArgs, never>
    >;
    lockUser?: Resolver<
        Maybe<ResolversTypes['UserMutationResponse']>,
        ParentType,
        ContextType,
        RequireFields<MutationLockUserArgs, 'id'>
    >;
    register?: Resolver<
        Maybe<ResolversTypes['UserMutationResponse']>,
        ParentType,
        ContextType,
        RequireFields<MutationRegisterArgs, never>
    >;
    resetPassword?: Resolver<
        Maybe<ResolversTypes['UserMutationResponse']>,
        ParentType,
        ContextType,
        RequireFields<
            MutationResetPasswordArgs,
            'token' | 'emailAddress' | 'newPassword'
        >
    >;
    seedData?: Resolver<
        Maybe<ResolversTypes['MutationResponse']>,
        ParentType,
        ContextType
    >;
    unlockUser?: Resolver<
        Maybe<ResolversTypes['UserMutationResponse']>,
        ParentType,
        ContextType,
        RequireFields<MutationUnlockUserArgs, 'id'>
    >;
    updateProfile?: Resolver<
        Maybe<ResolversTypes['UserMutationResponse']>,
        ParentType,
        ContextType,
        RequireFields<MutationUpdateProfileArgs, never>
    >;
    updateUser?: Resolver<
        Maybe<ResolversTypes['UserMutationResponse']>,
        ParentType,
        ContextType,
        RequireFields<MutationUpdateUserArgs, 'id'>
    >;
}>;

export type MutationResponseResolvers<
    ContextType = Context,
    ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']
> = ResolversObject<{
    message?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type QueryResolvers<
    ContextType = Context,
    ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
    _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    getProfile?: Resolver<
        Maybe<ResolversTypes['User']>,
        ParentType,
        ContextType
    >;
    getUserById?: Resolver<
        Maybe<ResolversTypes['User']>,
        ParentType,
        ContextType,
        RequireFields<QueryGetUserByIdArgs, 'id'>
    >;
    searchUsers?: Resolver<
        Maybe<ResolversTypes['UserSearchResult']>,
        ParentType,
        ContextType,
        RequireFields<QuerySearchUsersArgs, never>
    >;
}>;

export type TokenResolvers<
    ContextType = Context,
    ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']
> = ResolversObject<{
    accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    expiresIn?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type UserResolvers<
    ContextType = Context,
    ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = ResolversObject<{
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    emailAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    dateOfBirth?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    isLockedOut?: Resolver<
        Maybe<ResolversTypes['Boolean']>,
        ParentType,
        ContextType
    >;
    roles?: Resolver<
        Maybe<Array<ResolversTypes['String']>>,
        ParentType,
        ContextType
    >;
    __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type UserMutationResponseResolvers<
    ContextType = Context,
    ParentType extends ResolversParentTypes['UserMutationResponse'] = ResolversParentTypes['UserMutationResponse']
> = ResolversObject<{
    message?: Resolver<
        Maybe<ResolversTypes['String']>,
        ParentType,
        ContextType
    >;
    code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
    __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type UserSearchResultResolvers<
    ContextType = Context,
    ParentType extends ResolversParentTypes['UserSearchResult'] = ResolversParentTypes['UserSearchResult']
> = ResolversObject<{
    items?: Resolver<
        Maybe<Array<ResolversTypes['User']>>,
        ParentType,
        ContextType
    >;
    before?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    after?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
    DateTime?: GraphQLScalarType;
    Mutation?: MutationResolvers<ContextType>;
    MutationResponse?: MutationResponseResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
    Token?: TokenResolvers<ContextType>;
    User?: UserResolvers<ContextType>;
    UserMutationResponse?: UserMutationResponseResolvers<ContextType>;
    UserSearchResult?: UserSearchResultResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
