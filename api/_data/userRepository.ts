import { Client, query as q } from 'faunadb';
import { base64EncodeObj, base64DecodeObj } from '../_utils/encode';
import { config } from '../_utils/config';

const client = new Client({ secret: config.FAUNADB_SECRET });

const collections: { [key: string]: string } = {
    USERS: 'users'
};

const indexes: { [key: string]: { name: string; values: string[] } } = {
    USERS_BY_EMAIL_ADDRESS: { name: 'users_by_email_address', values: [] },
    USERS_EMAIL_ADDRESS_DESC: {
        name: 'users_email_address_desc',
        values: ['emailAddress', 'firstName', 'lastName', 'ref']
    },
    USERS_EMAIL_ADDRESS_ASC: {
        name: 'users_email_address_asc',
        values: ['emailAddress', 'firstName', 'lastName', 'ref']
    },
    USERS_NAME_DESC: {
        name: 'users_name_desc',
        values: ['firstName', 'lastName', 'emailAddress', 'ref']
    },
    USERS_NAME_ASC: {
        name: 'users_name_asc',
        values: ['firstName', 'lastName', 'emailAddress', 'ref']
    }
};

const errors: { [key: string]: string } = {
    NOT_FOUND: 'NotFound'
};

export interface FaunaIndex {
    name: string;
    values: string[];
}

export interface FaunaCursor {
    id: string;
    collection: {
        id: string;
    };
}

export interface FaunaCursors {
    before?: FaunaCursor[];
    after?: FaunaCursor[];
}

export interface FaunaQuery<T> {
    ref: { id: string };
    data: T;
}

export interface FaunaPaginatedQuery<T> {
    data: FaunaQuery<T>[];
    before?: FaunaCursor[];
    after?: FaunaCursor[];
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
    size?: number;
    search?: string;
    sort?: string;
    cursor?: string;
}

export interface Users extends Cursors {
    items: User[];
}

export const getUserById = async (id: string) => {
    try {
        const result = await client.query<UserQuery>(
            q.Get(q.Ref(q.Collection(collections.USERS), id))
        );

        return mapUser(result);
    } catch (error) {
        if (error.name === errors.NOT_FOUND) {
            return undefined;
        }

        throw error;
    }
};

export const getUserByEmailAddress = async (emailAddress: string) => {
    try {
        const result = await client.query<UserQuery>(
            q.Get(
                q.Match(
                    q.Index(indexes.USERS_BY_EMAIL_ADDRESS.name),
                    emailAddress
                )
            )
        );

        return mapUser(result);
    } catch (error) {
        if (error.name === errors.NOT_FOUND) {
            return undefined;
        }

        throw error;
    }
};

export const createUser = async (user: UserData) => {
    const result = await client.query<UserQuery>(
        q.Create(q.Collection(collections.USERS), { data: user })
    );

    return mapUser(result);
};

export const updateUser = async (user: User) => {
    const { id, ...data } = user;

    const result = await client.query<UserQuery>(
        q.Replace(q.Ref(q.Collection(collections.USERS), id), { data })
    );

    return mapUser(result);
};

export const removeUser = async (user: User) => {
    const result = await client.query<UserQuery>(
        q.Delete(q.Ref(q.Collection(collections.USERS), user.id))
    );

    return mapUser(result);
};

export const searchUsers = async (filter: UserFilter): Promise<Users> => {
    const { name, values } =
        indexes[filter.sort || ''] || indexes.USERS_NAME_ASC;
    const { before, after } = parseStringCursor(filter.cursor);

    const result = await client.query<UserPaginatedQuery>(
        q.Map(
            q.Paginate(
                q.Filter(
                    q.Match(name),
                    q.Lambda(
                        values,
                        q.ContainsStr(
                            q.Casefold(q.Var('emailAddress')),
                            q.Casefold(filter.search || '')
                        )
                    )
                ),
                {
                    size: filter.size,
                    before,
                    after
                }
            ),
            q.Lambda(values, q.Get(q.Var('ref')))
        )
    );

    return {
        items: result.data.map(mapUser),
        ...generateStringCursors(result)
    };
};

const generateStringItems = (
    arr?: FaunaCursor[]
): FaunaCursor[] | undefined => {
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

const generateStringCursors = (cursors: FaunaCursors): Cursors => {
    const before =
        cursors.before &&
        base64EncodeObj({ before: generateStringItems(cursors.before) });

    const after =
        cursors.after &&
        base64EncodeObj({ after: generateStringItems(cursors.after) });

    return { before, after };
};

const parseStringItems = (arr?: FaunaCursor[]): FaunaCursor[] | undefined => {
    if (!arr) {
        return undefined;
    }

    return arr.map(item => {
        if (!item.collection) {
            return item;
        }

        return q.Ref(q.Collection(item.collection.id), item.id) as FaunaCursor;
    });
};

const parseStringCursor = (str?: string): FaunaCursors => {
    const decoded = base64DecodeObj<FaunaCursors>(str);

    const before =
        decoded && decoded.before && parseStringItems(decoded.before);

    const after = decoded && decoded.after && parseStringItems(decoded.after);

    return { before, after };
};

const mapUser = (user: UserQuery): User => ({ id: user.ref.id, ...user.data });
