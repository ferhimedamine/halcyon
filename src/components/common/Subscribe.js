import { useSubscription } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { USER_UPDATED } from '../../graphql';

export const Subscribe = () => {
    const { data, loading } = useSubscription(USER_UPDATED);

    if (!loading && data?.userUpdated) {
        toast.info(
            `${data.userUpdated.code} ${data.userUpdated.user.firstName} ${data.userUpdated.user.lastName}`
        );
    }

    return null;
};
