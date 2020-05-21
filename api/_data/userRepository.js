const { Client, query: q } = require('faunadb');
const { base64EncodeObj, base64DecodeObj } = require('../_utils/encode');
const config = require('../_utils/config');

const client = new Client({ secret: config.FAUNADB_SECRET });

const collections = {
    USERS: 'users'
};

const indexes = {
    USERS_BY_EMAIL_ADDRESS: { name: 'users_by_email_address' },
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

const errors = {
    NOT_FOUND: 'NotFound'
};

module.exports.getUserById = async id => {
    try {
        const result = await client.query(
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

module.exports.getUserByEmailAddress = async emailAddress => {
    try {
        const result = await client.query(
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

module.exports.createUser = async user => {
    const result = await client.query(
        q.Create(q.Collection(collections.USERS), { data: user })
    );

    return mapUser(result);
};

module.exports.updateUser = async user => {
    const { id, ...data } = user;

    const result = await client.query(
        q.Replace(q.Ref(q.Collection(collections.USERS), id), { data })
    );

    return mapUser(result);
};

module.exports.removeUser = async user => {
    const result = await client.query(
        q.Delete(q.Ref(q.Collection(collections.USERS), user.id))
    );

    return mapUser(result);
};

module.exports.searchUsers = async ({ size, search, sort, cursor }) => {
    const { name, values } = indexes[sort] || indexes.USERS_NAME_ASC;
    const { before, after } = parseStringCursor(cursor);

    const result = await client.query(
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
        ...generateStringCursors(result)
    };
};

const generateStringItems = arr => {
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

const generateStringCursors = cursors => {
    const before =
        cursors.before &&
        base64EncodeObj({ before: generateStringItems(cursors.before) });

    const after =
        cursors.after &&
        base64EncodeObj({ after: generateStringItems(cursors.after) });

    return { before, after };
};

const parseStringItems = arr => {
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

const parseStringCursor = str => {
    const decoded = base64DecodeObj(str);

    const before =
        decoded && decoded.before && parseStringItems(decoded.before);

    const after = decoded && decoded.after && parseStringItems(decoded.after);

    return { before, after };
};

const mapUser = user => ({ id: user.ref.id, ...user.data });
