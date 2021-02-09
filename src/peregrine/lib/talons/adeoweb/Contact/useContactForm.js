import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { errorMessages } from 'src/lib/util/errorMessages';
import { useFormik } from 'formik';

export const useContactForm = ({ initialValues = {} }) => {
    const { t } = useTranslation();

    const handleFormSubmit = values => {
        console.log(values);
    };

    const formSchema = yup.object({
        name: yup.string().required(t(errorMessages.required)),
        email: yup
            .string()
            .required(t(errorMessages.required))
            .email(t(errorMessages.email)),
        phone: yup.string(),
        message: yup.string().required(t(errorMessages.required))
    });

    const { handleSubmit, handleChange, values, errors, touched } = useFormik({
        validationSchema: formSchema,
        initialValues,
        onSubmit: handleFormSubmit
    });

    return {
        handleSubmit,
        handleChange,
        values,
        errors,
        touched
    };
};