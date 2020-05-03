const { Client, query: q } = require('faunadb');
const config = require('../_utils/config');

const client = new Client({ secret: config.FAUNADB_SECRET });

module.exports.getUserById = async id => {
    try {
        const result = await client.query(
            q.Get(q.Ref(q.Collection('users'), id))
        );

        return { ...result.data, id: result.ref.id };
    } catch (error) {
        if (error.name === 'NotFound') {
            return undefined;
        }

        throw error;
    }
};

module.exports.getUserByEmailAddress = async emailAddress => {
    try {
        const result = await client.query(
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

module.exports.createUser = async user => {
    const result = await client.query(
        q.Create(q.Collection('users'), { data: user })
    );

    return mapUser(result);
};

module.exports.updateUser = async user => {
    const { id, ...data } = user;

    const result = await client.query(
        q.Replace(q.Ref(q.Collection('users'), id), { data })
    );

    return mapUser(result);
};

module.exports.removeUser = async ({ id }) => {
    const result = await client.query(
        q.Delete(q.Ref(q.Collection('users'), id))
    );

    return mapUser(result);
};

module.exports.searchUsers = async ({ size, search, sort, cursor }) => {
    const { name, fields } = getIndex(sort);

    const result = await client.query(
        q.Map(
            q.Paginate(q.Match(q.Index(name)), {
                size: Math.min(size, 50)
            }),
            q.Lambda(fields, q.Get(q.Var('ref')))
        )
    );

    return {
        items: result.data.map(mapUser),
        before: undefined,
        after: undefined
    };
};

const getIndex = sort => {
    switch (sort) {
        case 'EMAIL_ADDRESS_DESC':
            return {
                name: 'users_email_address_desc',
                fields: ['emailAddress', 'ref']
            };

        case 'EMAIL_ADDRESS_ASC':
            return {
                name: 'users_email_address_asc',
                fields: ['emailAddress', 'ref']
            };

        case 'NAME_DESC':
            return {
                name: 'users_name_desc',
                fields: ['firstName', 'lastName', 'ref']
            };

        default:
            return {
                name: 'users_name_asc',
                fields: ['firstName', 'lastName', 'ref']
            };
    }
};

const mapUser = user => ({ id: user.ref.id, ...user.data });
