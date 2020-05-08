const { authenticate } = require('./_utils/ws');

module.exports = (req, res) => {
    const { socket_id, channel_name } = req.body;
    const auth = authenticate(socket_id, channel_name);
    return res.send(auth);
};
