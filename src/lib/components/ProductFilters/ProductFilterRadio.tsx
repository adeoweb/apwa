import React, { FunctionComponent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { TAggregationOption } from 'src/lib/types/graphql/Aggregation';
import filterOutNullableValues from 'src/peregrine/lib/util/adeoweb/filterOutNullableValues';

import { TProductFilterProps } from './ProductFilterTypes';

const ProductFilterRadio: FunctionComponent<TProductFilterProps> = ({
    filter,
    isActive,
    setOptions
}) => {
    const options = filterOutNullableValues(filter?.options);
    const { t } = useTranslation('common');
    const selectValue = useCallback(
        (value: string) => {
            setOptions([value]);
        },
        [setOptions]
    );

    if (!options.length) {
        return null;
    }

    const getIcon = (value: string) =>
        isActive(value) ? (
            <i className="icon-check" />
        ) : (
            <i className="icon-check-empty" />
        );

    const getLabel = (option: TAggregationOption) => {
        const { value, label } = option;
        switch (value) {
            case '0':
                return t('No');
            case '1':
                return t('Yes');
            default:
                return label;
        }
    };

    return (
        <ul className="cat-list">
            {options.map(option => {
                const { value, count } = option;
                const label = getLabel(option);
                const icon = getIcon(value);
                const text = `${label}${count ? ' (' + count + ')' : ''}`;

                return (
                    <li key={value}>
                        <button onClick={() => selectValue(value)}>
                            {icon}
                            {text}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

ProductFilterRadio.displayName = 'ProductFilterRadio';

export default ProductFilterRadio;
