import React, { useContext } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Container, Alert } from 'reactstrap';
import confirm from 'reactstrap-confirm';
import { toast } from 'react-toastify';
import { GET_PROFILE, DELETE_ACCOUNT } from '../graphql';
import { Button, Spinner, AuthContext } from '../components';

export const MyAccountPage = ({ history }) => {
    const { removeToken } = useContext(AuthContext);

    const { loading, data } = useQuery(GET_PROFILE);

    const [deleteAccount, { loading: isDeleting }] = useMutation(
        DELETE_ACCOUNT
    );

    if (loading) {
        return <Spinner />;
    }

    if (!data?.getProfile) {
        return (
            <Alert color="info" className="container p-3 mb-3">
                Profile could not be found.
            </Alert>
        );
    }

    const onDeleteAccount = async () => {
        const confirmed = await confirm({
            title: 'Confirm',
            message: 'Are you sure you want to delete your account?',
            cancelColor: 'secondary'
        });

        if (!confirmed) {
            return;
        }

        const result = await deleteAccount();
        toast.success(result.data.deleteAccount.message);
        removeToken();
        history.push('/');
    };

    return (
        <Container>
            <h1>My Account</h1>
            <hr />

            <div className="d-flex justify-content-between">
                <h3>Profile</h3>
                <Button
                    to="/update-profile"
                    color="primary"
                    className="align-self-start"
                    tag={Link}
                >
                    Update
                </Button>
            </div>
            <hr />

            <p>
                <span className="text-muted">Email Address</span>
                <br />
                {data.getProfile.emailAddress}
            </p>

            <p>
                <span className="text-muted">Password</span>
                <br />
                ********
                <br />
                <Link to="/change-password">Change your password...</Link>
            </p>

            <p>
                <span className="text-muted">Name</span>
                <br />
                {data.getProfile.firstName} {data.getProfile.lastName}
            </p>

            <p>
                <span className="text-muted">Date of Birth</span>
                <br />
                {moment(data.getProfile.dateOfBirth).format('DD MMMM YYYY')}
            </p>

            <h3>Settings</h3>
            <hr />
            <p>
                Once you delete your account all of your data and settings will
                be removed. Please be certain.
            </p>
            <p>
                <Button
                    color="danger"
                    loading={isDeleting}
                    onClick={onDeleteAccount}
                >
                    Delete Account
                </Button>
            </p>
        </Container>
    );
};
