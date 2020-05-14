const { authenticate } = require('./_utils/push');
const { verifyToken } = require('./_utils/jwt');
const { isAuthorized, USER_ADMINISTRATOR } = require('./_utils/auth');

module.exports = async (req, res) => {
    const headers = req.headers;
    const authHeader = headers.authorization || headers.Authorization || '';

    const token = authHeader.replace(/bearer /giu, '');
    const payload = token ? await verifyToken(token) : undefined;
    if (!payload) {
        return res
            .status(401)
            .send('The token provided was invalid.');
    }

    const authorized = isAuthorized(payload, USER_ADMINISTRATOR);
    if (!authorized) {
        return res
            .status(403)
            .send('You are not authorized to view this resource.');
    }

    const { socket_id, channel_name } = req.body;
    const auth = authenticate(socket_id, channel_name, payload);

    return res.status(200).send(auth);
};
