const Pusher = require('pusher');
const config = require('./config');

const pusher = new Pusher({
    appId: config.PUSHER_APPID,
    key: config.PUSHER_APPKEY,
    secret: config.PUSHER_SECRET,
    cluster: config.PUSHER_CLUSTER
});

export const publish = ({ channel, event, data, socketId }) =>
    pusher.trigger(channel, event, data);

export const authenticate = (socketId, channel, user) =>
    pusher.authenticate(socketId, channel, user);
