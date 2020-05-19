import { Client, query as q } from 'faunadb';
import { base64EncodeObj, base64DecodeObj } from '../_utils/encode';
import { config } from '../_utils/config';

const client = new Client({ secret: config.FAUNADB_SECRET! });

export interface User {
    id: string;
    emailAddress: string;
    firstName: string;
    lastName: string;
    roles: string[];
}

export const getUserById = async (id: string) => {
    try {
        const result = await client.query<any>(
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
        const result = await client.query<any>(
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

export const createUser = async (user: any) => {
    const result = await client.query<any>(
        q.Create(q.Collection('users'), { data: user })
    );

    return mapUser(result);
};

export const updateUser = async (user: any) => {
    const { id, ...data } = user;

    const result = await client.query<any>(
        q.Replace(q.Ref(q.Collection('users'), id), { data })
    );

    return mapUser(result);
};

export const removeUser = async (id: string) => {
    const result = await client.query<any>(
        q.Delete(q.Ref(q.Collection('users'), id))
    );

    return mapUser(result);
};

export const searchUsers = async ({
    size,
    search,
    sort,
    cursor
}: any): Promise<any> => {
    const { name, values } = getIndex(sort);
    const { before, after } = parseCursor(cursor);

    const result = await client.query<any>(
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
        ...generateCursors(result)
    };
};

const getIndex = (sort: string): any => {
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

const getItems = (arr: any[]) => {
    if (!arr) {
        return undefined;
    }

    return arr.map(item => {
        if (!item.collection) {
            return item;
        }

        return { collection: item.collection.id, id: item.id };
    });
};

const generateCursors = ({ before, after }: any): any => ({
    before: before && base64EncodeObj({ before: getItems(before) }),
    after: after && base64EncodeObj({ after: getItems(after) })
});

const parseItems = (arr: any[]) => {
    if (!arr) {
        return undefined;
    }

    return arr.map(item => {
        if (!item.collection) {
            return item;
        }

        return q.Ref(q.Collection(item.collection), item.id);
    });
};

const parseCursor = (str: string) => {
    const decoded = base64DecodeObj<any>(str);
    if (!decoded) {
        return {
            before: undefined,
            after: undefined
        };
    }

    return {
        before: parseItems(decoded.before),
        after: parseItems(decoded.after)
    };
};

const mapUser = (user: any): any => ({ id: user.ref.id, ...user.data });
