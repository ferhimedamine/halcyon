import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Container, FormGroup } from 'reactstrap';
import { toast } from 'react-toastify';
import { useForgotPasswordMutation } from '../graphql/gen-types';
import { TextInput, Button } from '../components';
import { captureException } from '../utils/logger';
import { RouteComponentProps } from 'react-router-dom';

const validationSchema = Yup.object().shape({
    emailAddress: Yup.string().label('Email Address').email().required()
});

type ForgotPasswordFormValues = Yup.InferType<typeof validationSchema>;

const initialValues: ForgotPasswordFormValues = {
    emailAddress: ''
};

export const ForgotPasswordPage: React.FC<RouteComponentProps> = ({
    history
}) => {
    const [forgotPassword] = useForgotPasswordMutation();

    const onSubmit = async (variables: ForgotPasswordFormValues) => {
        try {
            const result = await forgotPassword({ variables });
            toast.success(result.data!.forgotPassword!.message);
            history.push('/login');
        } catch (error) {
            captureException(error);
        }
    };

    return (
        <Container>
            <h1>Forgotten Password</h1>
            <hr />

            <Formik<ForgotPasswordFormValues>
                initialValues={initialValues}
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

                        <FormGroup className="text-right">
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
