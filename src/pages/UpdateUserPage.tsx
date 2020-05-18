import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Container, Alert, FormGroup } from 'reactstrap';
import confirm from 'reactstrap-confirm';
import { toast } from 'react-toastify';
import {
    useGetUserByIdQuery,
    useUpdateUserMutation,
    useLockUserMutation,
    useUnlockUserMutation,
    useDeleteUserMutation
} from '../graphql';
import {
    Spinner,
    TextInput,
    DateInput,
    CheckboxGroupInput,
    Button
} from '../components';
import { AVAILABLE_ROLES } from '../utils/auth';
import { captureException } from '../utils/logger';

export interface UpdateUserPageParams {
    id: string;
}

const validationSchema = Yup.object().shape({
    emailAddress: Yup.string()
        .label('Email Address')
        .max(254)
        .email()
        .required(),
    firstName: Yup.string().label('First Name').max(50).required(),
    lastName: Yup.string().label('Last Name').max(50).required(),
    dateOfBirth: Yup.string().label('Date of Birth').required(),
    roles: Yup.array(Yup.string()).label('Roles').notRequired()
});

type UpdateUserFormValues = Yup.InferType<typeof validationSchema>;

export const UpdateUserPage: React.FC<RouteComponentProps<
    UpdateUserPageParams
>> = ({ history, match }) => {
    const { loading, data } = useGetUserByIdQuery({
        variables: { id: match.params.id }
    });

    const [updateUser] = useUpdateUserMutation();

    const [lockUser, { loading: isLocking }] = useLockUserMutation();

    const [unlockUser, { loading: isUnlocking }] = useUnlockUserMutation();

    const [deleteUser, { loading: isDeleting }] = useDeleteUserMutation();

    if (loading) {
        return <Spinner />;
    }

    if (!data?.getUserById) {
        return (
            <Alert color="info" className="container p-3 mb-3">
                User could not be found.
            </Alert>
        );
    }

    const onSubmit = async (variables: UpdateUserFormValues) => {
        try {
            const result = await updateUser({
                variables: { id: match.params.id, ...variables }
            });
            toast.success(result.data!.updateUser!.message);
            history.push('/user');
        } catch (error) {
            captureException(error);
        }
    };

    const onLockUser = async () => {
        const confirmed = await confirm({
            title: 'Confirm',
            message: (
                <>
                    Are you sure you want to lock{' '}
                    <strong>
                        {data.getUserById!.firstName}{' '}
                        {data.getUserById!.lastName}
                    </strong>
                    ?
                </>
            ),
            cancelColor: 'secondary'
        });

        if (!confirmed) {
            return;
        }

        const result = await lockUser({ variables: { id: match.params.id } });
        toast.success(result.data!.lockUser!.message);
    };

    const onUnlockUser = async () => {
        const confirmed = await confirm({
            title: 'Confirm',
            message: (
                <>
                    Are you sure you want to unlock{' '}
                    <strong>
                        {data.getUserById!.firstName}{' '}
                        {data.getUserById!.lastName}
                    </strong>
                    ?
                </>
            ),
            cancelColor: 'secondary'
        });

        if (!confirmed) {
            return;
        }

        const result = await unlockUser({ variables: { id: match.params.id } });
        toast.success(result.data!.unlockUser!.message);
    };

    const onDeleteUser = async () => {
        const confirmed = await confirm({
            title: 'Confirm',
            message: (
                <>
                    Are you sure you want to delete{' '}
                    <strong>
                        {data.getUserById!.firstName}{' '}
                        {data.getUserById!.lastName}
                    </strong>
                    ?
                </>
            ),
            cancelColor: 'secondary'
        });

        if (!confirmed) {
            return;
        }

        const result = await deleteUser({ variables: { id: match.params.id } });
        toast.success(result.data!.deleteUser!.message);
        history.push('/user');
    };

    return (
        <Container>
            <h1>
                User
                <br />
                <small className="text-muted">Update</small>
            </h1>
            <hr />

            <Formik<UpdateUserFormValues>
                initialValues={data.getUserById}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form noValidate>
                        <Field
                            name="emailAddress"
                            type="email"
                            label="Email Address"
                            required
                            maxLength={254}
                            autoComplete="username"
                            component={TextInput}
                        />

                        <Field
                            name="firstName"
                            type="text"
                            label="First Name"
                            required
                            maxLength={50}
                            component={TextInput}
                        />

                        <Field
                            name="lastName"
                            type="text"
                            label="Last Name"
                            required
                            maxLength={50}
                            component={TextInput}
                        />

                        <Field
                            name="dateOfBirth"
                            type="date"
                            label="Date Of Birth"
                            required
                            component={DateInput}
                        />

                        <Field
                            name="roles"
                            label="Roles"
                            options={AVAILABLE_ROLES}
                            component={CheckboxGroupInput}
                        />

                        <FormGroup className="text-right">
                            <Button to="/user" className="mr-1" tag={Link}>
                                Cancel
                            </Button>
                            {data.getUserById!.isLockedOut ? (
                                <Button
                                    color="warning"
                                    className="mr-1"
                                    loading={isUnlocking}
                                    disabled={
                                        isLocking || isDeleting || isSubmitting
                                    }
                                    onClick={onUnlockUser}
                                >
                                    Unlock
                                </Button>
                            ) : (
                                <Button
                                    color="warning"
                                    className="mr-1"
                                    loading={isLocking}
                                    disabled={
                                        isUnlocking ||
                                        isDeleting ||
                                        isSubmitting
                                    }
                                    onClick={onLockUser}
                                >
                                    Lock
                                </Button>
                            )}
                            <Button
                                color="danger"
                                className="mr-1"
                                loading={isDeleting}
                                disabled={
                                    isLocking || isUnlocking || isSubmitting
                                }
                                onClick={onDeleteUser}
                            >
                                Delete
                            </Button>
                            <Button
                                type="submit"
                                color="primary"
                                loading={isSubmitting}
                                disabled={
                                    isLocking || isUnlocking || isDeleting
                                }
                            >
                                Submit
                            </Button>
                        </FormGroup>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};
