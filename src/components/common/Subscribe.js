import Pusher from 'pusher-js';
import { toast } from 'react-toastify';
import { useQuery } from '@apollo/react-hooks';
import { GET_LOCAL_CONTEXT, setSocketId, removeSocketId } from '../../graphql';
import config from '../../utils/config';

export const Subscribe = () => {
    const { data } = useQuery(GET_LOCAL_CONTEXT);

    const pusher = new Pusher(config.PUSHER_APPKEY, {
        cluster: config.PUSHER_CLUSTER,
        authEndpoint: '/api/auth',
        auth: {
            headers: {
                authorization: data.accessToken
                    ? `Bearer ${data.accessToken}`
                    : ''
            }
        }
    });

    const channel = pusher.subscribe('private-user');

    pusher.connection.bind('connected', () =>
        setSocketId(pusher.connection.socket_id)
    );

    pusher.connection.bind('disconnected', () => removeSocketId());

    channel.bind('USER_CREATED', data =>
        toast.info(`USER_CREATED ${data.firstName} ${data.lastName}`)
    );

    channel.bind('USER_UPDATED', data =>
        toast.info(`USER_UPDATED ${data.firstName} ${data.lastName}`)
    );

    channel.bind('USER_REMOVED', data =>
        toast.info(`USER_UPDATED ${data.firstName} ${data.lastName}`)
    );

    return null;
};
