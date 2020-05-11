import { useContext, useEffect } from 'react';
import Pusher from 'pusher-js';
import { toast } from 'react-toastify';
import { AuthContext } from '../providers/AuthProvider';
import config from '../../utils/config';

export const Subscribe = () => {
    const { accessToken, setSocketId } = useContext(AuthContext);

    useEffect(() => {
        console.log('accessToken Changed');

        const pusher = new Pusher(config.PUSHER_APPKEY, {
            cluster: config.PUSHER_CLUSTER,
            authEndpoint: '/api/auth',
            auth: {
                headers: {
                    authorization: accessToken
                        ? `Bearer ${accessToken}`
                        : undefined
                }
            }
        });

        const channel = pusher.subscribe('private-user');

        pusher.connection.bind('connected', () => {
            console.log('connected');
            setSocketId(pusher.connection.socket_id);
        });

        pusher.connection.bind('disconnected', () => {
            console.log('disconnected');
            setSocketId(undefined);
        });

        channel.bind('USER_CREATED', data =>
            toast.info(`USER_CREATED ${data.firstName} ${data.lastName}`)
        );

        channel.bind('USER_UPDATED', data =>
            toast.info(`USER_UPDATED ${data.firstName} ${data.lastName}`)
        );

        channel.bind('USER_REMOVED', data =>
            toast.info(`USER_UPDATED ${data.firstName} ${data.lastName}`)
        );
    }, [accessToken]);

    return null;
};
