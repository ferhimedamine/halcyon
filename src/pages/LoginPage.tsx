import React, { useContext } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Container, FormGroup } from 'reactstrap';
import { useGenerateTokenMutation, GrantType } from '../graphql';
import { TextInput, CheckboxInput, Button, AuthContext } from '../components';
import { captureException } from '../utils/logger';

const validationSchema = Yup.object().shape({
    emailAddress: Yup.string().label('Email Address').email().required(),
    password: Yup.string().label('Password').required(),
    rememberMe: Yup.bool().label('Remember Me').required()
});

type LoginFormValues = Yup.InferType<typeof validationSchema>;

const initialValues: LoginFormValues = {
    emailAddress: '',
    password: '',
    rememberMe: true
};

export const LoginPage: React.FC<RouteComponentProps> = ({ history }) => {
    const { setToken } = useContext(AuthContext);

    const [generateToken] = useGenerateTokenMutation();

    const onSubmit = async (variables: LoginFormValues) => {
        try {
            const result = await generateToken({
                variables: {
                    grantType: GrantType.Password,
                    ...variables
                }
            });

            setToken(
                result.data!.generateToken!.accessToken,
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

            <Formik<LoginFormValues>
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
