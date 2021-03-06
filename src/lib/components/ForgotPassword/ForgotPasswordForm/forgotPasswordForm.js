import { Form } from 'informed';
import { func, shape, string } from 'prop-types';

import React from 'react';

import { mergeClasses } from '../../../classify';
import combine from '../../../util/combineValidators';
import { isRequired, validateEmail } from '../../../util/formValidators';
import Button from '../../Button';
import Field from '../../Field';
import TextInput from '../../TextInput';

import defaultClasses from './forgotPasswordForm.css';

const ForgotPasswordForm = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { initialValues, isResettingPassword, onSubmit } = props;

    return (
        <Form
            className={classes.root}
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            <Field label="Email Address" required={true}>
                <TextInput
                    autoComplete="email"
                    field="email"
                    validate={combine([isRequired, validateEmail])}
                />
            </Field>
            <div className={classes.buttonContainer}>
                <Button
                    disabled={isResettingPassword}
                    type="submit"
                    priority="high"
                >
                    Submit
                </Button>
            </div>
        </Form>
    );
};

ForgotPasswordForm.propTypes = {
    classes: shape({
        form: string,
        buttonContainer: string
    }),
    initialValues: shape({
        email: string
    }),
    onSubmit: func.isRequired
};

ForgotPasswordForm.defaultProps = {
    initialValues: {}
};

export default ForgotPasswordForm;
