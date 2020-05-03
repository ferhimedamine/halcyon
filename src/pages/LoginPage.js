import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Container, FormGroup } from 'reactstrap';
import { setToken, GENERATE_TOKEN } from '../graphql';
import { captureException } from '../utils/logger';
import { TextInput, CheckboxInput, Button } from '../components';

const initialValues = {
    emailAddress: '',
    password: '',
    rememberMe: true
};

const validationSchema = Yup.object().shape({
    emailAddress: Yup.string().label('Email Address').email().required(),
    password: Yup.string().label('Password').required()
});

export const LoginPage = ({ history }) => {
    const [generateToken] = useMutation(GENERATE_TOKEN, {
        variables: { grantType: 'PASSWORD' }
    });

    const onSubmit = async variables => {
        try {
            const result = await generateToken({ variables });
            setToken(
                result.data.generateToken.accessToken,
                variables.rememberMe
            );
            history.push('/');
        } catch (error) {
            captureException(error);
        }
    };

    return (
        <Container>
            <h1>Login</h1>
            <hr />

            <Formik
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

                        <Field
                            name="password"
                            type="password"
                            label="Password"
                            required
                            maxLength={50}
                            autoComplete="current-password"
                            component={TextInput}
                        />

                        <Field
                            name="rememberMe"
                            label="Remember my password on this computer"
                            component={CheckboxInput}
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

            <p>
                Not already a member? <Link to="/register">Register now</Link>
            </p>
            <p>
                Forgotten your password?{' '}
                <Link to="/forgot-password">Request reset</Link>
            </p>
        </Container>
    );
};
