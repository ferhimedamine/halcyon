import React from 'react';
import { Container, Spinner as BaseSpinner } from 'reactstrap';

export const Spinner: React.FC = () => (
    <Container className="spinner text-center">
        <BaseSpinner type="grow" color="light" />
        <BaseSpinner type="grow" color="light" />
        <BaseSpinner type="grow" color="light" />
    </Container>
);
