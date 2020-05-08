const Pusher = require('pusher');
const config = require('./config');

const pusher = new Pusher({
    appId: config.PUSHER_APPID,
    key: config.PUSHER_APPKEY,
    secret: config.PUSHER_SECRET,
    cluster: config.PUSHER_CLUSTER
});

export const publish = (event, data) => {
    return pusher.trigger('halcyon-graphql', event, data);
};
