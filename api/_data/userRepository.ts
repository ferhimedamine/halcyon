import { Client, query as q, Expr } from 'faunadb';
import { base64EncodeObj, base64DecodeObj } from '../_utils/encode';
import { config } from '../_utils/config';

const client = new Client({ secret: config.FAUNADB_SECRET! });

export interface FaunaIndex {
    name: string;
    values: string[];
}

export interface SerializedCursor {
    id: string;
    collection: {
        id: string;
    };
}

export interface SerializedCursors {
    before?: SerializedCursor[];
    after?: SerializedCursor[];
}

export interface DeserializedCursors {
    before?: any[];
    after?: any[];
}

export interface Cursors {
    before?: string;
    after?: string;
}

export interface FaunaQuery<T> {
    ref: { id: string };
    data: T;
}

export interface FaunaPaginatedQuery<T> {
    data: FaunaQuery<T>[];
    before?: Expr[];
    after?: Expr[];
}

export interface Cursors {
    before?: string;
    after?: string;
}

export interface UserQuery extends FaunaQuery<UserData> {}

export interface UserPaginatedQuery extends FaunaPaginatedQuery<UserData> {}

export interface UserData {
    emailAddress: string;
    password: string;
    passwordResetToken?: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    isLockedOut: boolean;
    roles?: string[];
}

export interface User extends UserData {
    id: string;
}

export interface UserFilter {
    size: number;
    search: string;
    sort: string;
    cursor?: string;
}

export interface Users extends Cursors {
    items: User[];
}

export const getUserById = async (id: string) => {
    try {
        const result = await client.query<UserQuery>(
            q.Get(q.Ref(q.Collection('users'), id))
        );

        return mapUser(result);
    } catch (error) {
        if (error.name === 'NotFound') {
            return undefined;
        }

        throw error;
    }
};

export const getUserByEmailAddress = async (emailAddress: string) => {
    try {
        const result = await client.query<UserQuery>(
            q.Get(q.Match(q.Index('users_by_email_address'), emailAddress))
        );

        return mapUser(result);
    } catch (error) {
        if (error.name === 'NotFound') {
            return undefined;
        }

        throw error;
    }
};

export const createUser = async (user: UserData) => {
    const result = await client.query<UserQuery>(
        q.Create(q.Collection('users'), { data: user })
    );

    return mapUser(result);
};

export const updateUser = async (user: User) => {
    const { id, ...data } = user;

    const result = await client.query<UserQuery>(
        q.Replace(q.Ref(q.Collection('users'), id), { data })
    );

    return mapUser(result);
};

export const removeUser = async (user: User) => {
    const result = await client.query<UserQuery>(
        q.Delete(q.Ref(q.Collection('users'), user.id))
    );

    return mapUser(result);
};

export const searchUsers = async ({
    size,
    search,
    sort,
    cursor
}: UserFilter): Promise<Users> => {
    const { name, values } = getIndex(sort);
    const { before, after } = deserializeCursors(cursor);

    const result = await client.query<UserPaginatedQuery>(
        q.Map(
            q.Paginate(
                q.Filter(
                    q.Match(name),
                    q.Lambda(
                        values,
                        q.ContainsStr(
                            q.Casefold(q.Var('emailAddress')),
                            q.Casefold(search)
                        )
                    )
                ),
                {
                    size,
                    before,
                    after
                }
            ),
            q.Lambda(values, q.Get(q.Var('ref')))
        )
    );

    return {
        items: result.data.map(mapUser),
        ...serializeCursors(result)
    };
};

const getIndex = (sort: string): FaunaIndex => {
    switch (sort) {
        case 'EMAIL_ADDRESS_DESC':
            return {
                name: 'users_email_address_desc',
                values: ['emailAddress', 'firstName', 'lastName', 'ref']
            };

        case 'EMAIL_ADDRESS_ASC':
            return {
                name: 'users_email_address_asc',
                values: ['emailAddress', 'firstName', 'lastName', 'ref']
            };

        case 'NAME_DESC':
            return {
                name: 'users_name_desc',
                values: ['firstName', 'lastName', 'emailAddress', 'ref']
            };

        default:
            return {
                name: 'users_name_asc',
                values: ['firstName', 'lastName', 'emailAddress', 'ref']
            };
    }
};

const serializeCursor = (arr: any[]): SerializedCursor[] | undefined => {
    if (!arr) {
        return undefined;
    }

    return arr.map(item => {
        if (!item.collection) {
            return item;
        }

        return { collection: { id: item.collection.id }, id: item.id };
    });
};

const serializeCursors = ({
    before,
    after
}: FaunaPaginatedQuery<any>): Cursors => ({
    before: before && base64EncodeObj({ before: serializeCursor(before) }),
    after: after && base64EncodeObj({ after: serializeCursor(after) })
});

const deserializeCursor = (arr?: SerializedCursor[]): any[] | undefined => {
    if (!arr) {
        return undefined;
    }

    return arr.map(item => {
        if (!item.collection) {
            return item;
        }

        return q.Ref(q.Collection(item.collection.id), item.id);
    });
};

const deserializeCursors = (str?: string): DeserializedCursors => {
    const decoded = base64DecodeObj<SerializedCursors>(str);
    if (!decoded) {
        return {
            before: undefined,
            after: undefined
        };
    }

    return {
        before: deserializeCursor(decoded.before),
        after: deserializeCursor(decoded.after)
    };
};

const mapUser = (user: UserQuery): User => ({ id: user.ref.id, ...user.data });
