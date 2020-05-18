import React from 'react';
import { FieldProps } from 'formik';
import { Input, FormGroup, Label, FormText } from 'reactstrap';

export interface TextInputProps extends FieldProps {
    label: string;
}

export const TextInput: React.FC<TextInputProps> = ({
    field,
    form,
    label,
    ...rest
}) => {
    const { name } = field;
    const { errors, touched } = form;
    const error = errors[name];
    const touch = touched[name];

    return (
        <FormGroup>
            <Label for={name}>{label}</Label>
            <Input
                id={name}
                invalid={!!touch && !!error}
                {...field}
                {...rest}
            />
            {touch && error && <FormText color="danger">{error}</FormText>}
        </FormGroup>
    );
};
