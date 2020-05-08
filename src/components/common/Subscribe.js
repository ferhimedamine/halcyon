import Pusher from 'pusher-js';
import { toast } from 'react-toastify';
import config from '../../utils/config';

export const Subscribe = () => {
    const pusher = new Pusher(config.PUSHER_APPKEY, {
        cluster: config.PUSHER_CLUSTER
    });

    const channel = pusher.subscribe('halcyon-graphql');

    channel.bind('userUpdated', data =>
        toast.info(
            `${data.userUpdated.code} ${data.userUpdated.user.firstName} ${data.userUpdated.user.lastName}`
        )
    );

    return null;
};
