const { authenticate } = require('./_utils/push');
const { verifyToken } = require('./_utils/jwt');

module.exports = async (req, res) => {
    const headers = req.headers;
    const authHeader = headers.authorization || headers.Authorization || '';

    const token = authHeader.replace(/bearer /giu, '');
    const payload = token ? await verifyToken(token) : undefined;

    const { socket_id, channel_name } = req.body;
    const auth = authenticate(socket_id, channel_name, payload);

    return res.send(auth);
};
