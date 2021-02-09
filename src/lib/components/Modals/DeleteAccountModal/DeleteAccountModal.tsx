import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { Button, Form, Modal, ModalProps } from 'react-bootstrap';
import { useFormik } from 'formik';
import { errorMessages } from 'src/lib/util/errorMessages';
import PasswordField from 'src/lib/components/PasswordField';

type TDeleteAccountModalProps = {
    close: () => void;
    modalProps: ModalProps;
};

type TDeleteAccountForm = {
    password: string;
};

const DeleteAccountModal: FunctionComponent<TDeleteAccountModalProps> = ({
    modalProps,
    close
}) => {
    const { t } = useTranslation();
    const validationSchema = yup.object({
        password: yup.string().required(t(errorMessages.required))
    });
    const initialValues = {
        password: ''
    };

    const onSubmit = useCallback((values: TDeleteAccountForm) => {
        // TODO: implement actual account delete action
        console.log('handle account deletion', values);
    }, []);

    const {
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
        isValid,
        values,
        errors,
        touched
    } = useFormik<TDeleteAccountForm>({
        validateOnMount: true,
        validationSchema,
        initialValues,
        onSubmit
    });

    const controlEvents = {
        onChange: handleChange,
        onBlur: handleBlur
    };

    useEffect(() => {
        resetForm();
    }, [resetForm]);

    return (
        <Modal {...modalProps} size="sm">
            <Modal.Header closeButton={true}>
                <h4>{t('Are you sure you want to delete account?')}</h4>
            </Modal.Header>
            <Modal.Body>
                <p>
                    {t(
                        'Deleting your account will result in the loss of all order information, invoices, and other account information.'
                    )}
                </p>
                <Form.Group>
                    <Form.Label>{t('Password')}</Form.Label>
                    <PasswordField
                        name="password"
                        value={values.password}
                        isInvalid={!!(errors.password && touched.password)}
                        {...controlEvents}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    disabled={!isValid}
                    onClick={() => handleSubmit()}
                >
                    {t('Delete account')}
                </Button>{' '}
                <Button variant="outline-primary" onClick={close}>
                    {t('Cancel')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteAccountModal;
