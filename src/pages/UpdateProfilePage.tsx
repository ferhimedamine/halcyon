import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Container, Alert, FormGroup } from 'reactstrap';
import { toast } from 'react-toastify';
import {
    useGetProfileQuery,
    useUpdateProfileMutation
} from '../graphql/gen-types';
import { Spinner, TextInput, DateInput, Button } from '../components';
import { captureException } from '../utils/logger';

const validationSchema = Yup.object().shape({
    emailAddress: Yup.string()
        .label('Email Address')
        .max(254)
        .email()
        .required(),
    firstName: Yup.string().label('First Name').max(50).required(),
    lastName: Yup.string().label('Last Name').max(50).required(),
    dateOfBirth: Yup.string().label('Date of Birth').required()
});

type UpdateProfileFormProps = Yup.InferType<typeof validationSchema>;

export const UpdateProfilePage: React.FC<RouteComponentProps> = ({
    history
}) => {
    const { loading, data } = useGetProfileQuery();

    const [updateProfile] = useUpdateProfileMutation();

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

    const onSubmit = async (variables: UpdateProfileFormProps) => {
        try {
            const result = await updateProfile({ variables });
            toast.success(result.data!.updateProfile!.message);
            history.push('/my-account');
        } catch (error) {
            captureException(error);
        }
    };

    return (
        <Container>
            <h1>Update Profile</h1>
            <hr />

            <Formik<UpdateProfileFormProps>
                initialValues={data.getProfile}
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

                        <FormGroup className="text-right">
                            <Button
                                to="/my-account"
                                className="mr-1"
                                tag={Link}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                color="primary"
                                loading={isSubmitting}
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
