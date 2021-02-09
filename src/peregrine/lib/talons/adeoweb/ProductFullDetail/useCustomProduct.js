import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { errorMessages } from 'src/lib/util/errorMessages';
import { createYupSchema } from 'src/lib/util/createYupSchema';

export const useCustomProduct = ({ product }) => {
    const { t } = useTranslation();
    const { options, price_range: priceRange } = product;
    const initialValues = {};
    const customOptions = options || [];
    let productPrice = 0;

    if (
        priceRange &&
        priceRange.minimum_price &&
        priceRange.minimum_price.final_price &&
        priceRange.minimum_price.final_price.value
    ) {
        productPrice = priceRange.minimum_price.final_price.value;
    }

    const formData = useMemo(() => {
        return customOptions.map(option => {
            const { option_id: optionId, required, __typename: type } = option;
            const validations = [];

            if (required) {
                validations.push({
                    type: 'required',
                    params: [t(errorMessages.required)]
                });
            }

            if (
                (type === 'CustomizableFieldOption' ||
                    type === 'CustomizableAreaOption') &&
                ((option.fieldValue && option.fieldValue.max_characters) ||
                    (option.areaValue && option.areaValue.max_characters))
            ) {
                const maxChars =
                    (option.fieldValue || {}).max_characters ||
                    (option.areaValue || {}).max_characters;
                validations.push({
                    type: 'max',
                    params: [
                        maxChars,
                        t(errorMessages.max, {
                            limit: maxChars
                        })
                    ]
                });
            }

            return {
                id: optionId,
                type: 'string',
                initialValue: '',
                validations
            };
        });
    }, [customOptions, t]);

    const yepSchema = formData.reduce(createYupSchema, {});
    const validationSchema = yup.object(yepSchema);

    formData.forEach(item => {
        initialValues[item.id] = item.initialValue;
    });

    const {
        handleBlur,
        handleChange,
        isValid,
        dirty: isDirty,
        values,
        errors,
        touched,
        setFieldValue
    } = useFormik({
        validateOnMount: true,
        validationSchema,
        initialValues,
        enableReinitialize: true,
        onSubmit: () => {}
    });

    const price = useMemo(() => {
        let total = 0;
        let selectedOptions = [];

        customOptions.forEach(option => {
            const { option_id: optionId, __typename: type } = option;
            const value = values[optionId];
            if (value) {
                switch (type) {
                    case 'CustomizableAreaOption':
                    case 'CustomizableFieldOption': {
                        const selectedOption =
                            option.areaValue || option.fieldValue;
                        if (selectedOption) {
                            selectedOptions.push(selectedOption);
                        }
                        break;
                    }
                    case 'CustomizableDropDownOption':
                    case 'CustomizableRadioOption': {
                        const selectedValue =
                            option.dropDownValue || option.radioValue;
                        if (selectedValue) {
                            const selectedOption = selectedValue.find(
                                ({ option_type_id: id }) =>
                                    id.toString() === value
                            );
                            if (selectedOption) {
                                selectedOptions.push(selectedOption);
                            }
                        }
                        break;
                    }
                    case 'CustomizableCheckboxOption': {
                        const selectedValue = option.checkboxValue;
                        if (selectedValue) {
                            const selectedCheckboxOptions = selectedValue.filter(
                                ({ option_type_id: id }) =>
                                    value.indexOf(id.toString()) !== -1
                            );
                            selectedOptions = selectedOptions.concat(
                                selectedCheckboxOptions
                            );
                        }
                        break;
                    }
                    // TODO: implement unsupported CustomizableOptionInterface types
                }
            }
        });

        selectedOptions.forEach(({ price, price_type: type }) => {
            if (price) {
                switch (type) {
                    case 'FIXED': {
                        total += price;
                        break;
                    }
                    case 'PERCENT': {
                        total +=
                            Math.round(((productPrice * price) / 100) * 100) /
                            100;
                        break;
                    }
                }
            }
        });

        return total;
    }, [values, customOptions, productPrice]);

    return {
        customOptions,
        handleBlur,
        handleChange,
        setFieldValue,
        isValid,
        dirty: isDirty,
        values,
        errors,
        touched,
        price
    };
};