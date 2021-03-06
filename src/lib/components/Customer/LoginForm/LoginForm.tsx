import { useFormik } from 'formik';

import React, { FunctionComponent, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import GET_CUSTOMER_QUERY from 'src/lib/queries/getCustomer.graphql';
import GET_CUSTOMER_CART_QUERY from 'src/lib/queries/getCustomerCart.graphql';
import MERGE_CARTS_MUTATION from 'src/lib/queries/mergeCarts.graphql';
import SIGN_IN_MUTATION from 'src/lib/queries/signIn.graphql';
import SIGN_OUT_MUTATION from 'src/lib/queries/signOut.graphql';
import { TGenerateCustomerTokenProps } from 'src/lib/types/graphql/SignIn';
import { errorMessages } from 'src/lib/util/errorMessages';
import { useSignIn } from 'src/peregrine/lib/talons/adeoweb/SignIn/useSignIn';

import { create as object } from 'yup/lib/object';
import { create as string } from 'yup/lib/string';

type TLoginFormProps = {
    openForgotPassword: () => void;
    isSignedInCallback?: () => void;
};

const LoginForm: FunctionComponent<TLoginFormProps> = ({
    openForgotPassword,
    isSignedInCallback
}) => {
    const { t } = useTranslation(['validations', 'customer']);

    const talonProps = useSignIn({
        signInMutation: SIGN_IN_MUTATION,
        customerQuery: GET_CUSTOMER_QUERY,
        getCustomerCartQuery: GET_CUSTOMER_CART_QUERY,
        mergeCartsMutation: MERGE_CARTS_MUTATION,
        signOutMutation: SIGN_OUT_MUTATION
    });

    const { handleSubmit: talonHandleSubmit, isBusy, isSignedIn } = talonProps;

    useEffect(() => {
        if (isSignedIn && typeof isSignedInCallback === 'function') {
            isSignedInCallback();
        }
    }, [isSignedIn, isSignedInCallback]);

    const schema = object({
        email: string().email().required(),
        password: string()
            .matches(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
                t(`validations:${errorMessages.password}` as const)
            )
            .required()
    });

    const submitCallback = (values: TGenerateCustomerTokenProps) => {
        talonHandleSubmit(values);
    };

    const { handleSubmit, handleChange, values, errors, touched } =
        useFormik<TGenerateCustomerTokenProps>({
            validationSchema: schema,
            initialValues: {
                email: '',
                password: ''
            },
            onSubmit: submitCallback
        });

    return (
        <Form noValidate onSubmit={handleSubmit}>
            <Form.Label>{t('customer:Email')}</Form.Label>
            <Form.Control
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={!!(errors.email && touched.email)}
                required
            />
            <Form.Control.Feedback type="invalid">
                {errors.email}
            </Form.Control.Feedback>

            <Form.Label>{t('customer:Password')}</Form.Label>
            <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={!!(errors.password && touched.email)}
                required
            />
            <Form.Control.Feedback type="invalid">
                {errors.password}
            </Form.Control.Feedback>

            <div className="form-footer">
                <button
                    type="submit"
                    disabled={isBusy}
                    className="btn btn-primary"
                >
                    {t('customer:Login')}
                </button>
                <Button
                    variant="link"
                    className="forget-pass"
                    onClick={openForgotPassword}
                >
                    {t('customer:Forgot your password?')}
                </Button>
            </div>
        </Form>
    );
};

export default LoginForm;
