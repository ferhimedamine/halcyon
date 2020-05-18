import React from 'react';
import { FieldProps } from 'formik';
import { Input, FormGroup, FormText, Label } from 'reactstrap';

export interface CheckboxInputProps extends FieldProps {
    label: string;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({
    field,
    form,
    label
}) => {
    const { name, value } = field;
    const { errors, touched } = form;
    const error = errors[name];
    const touch = touched[name];

    return (
        <FormGroup check>
            <Input
                id={name}
                type="checkbox"
                invalid={!!touch && !!error}
                checked={value}
                {...field}
            />
            <Label for={name}>{label}</Label>
            {touch && error && <FormText color="danger">{error}</FormText>}
        </FormGroup>
    );
};
