import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, Form } from 'react-bootstrap';
import {
    TAvailableShippingMethod,
    TSelectedShippingMethod
} from 'src/lib/types/graphql/Cart';
import Price from '@magento/peregrine/lib/Price';

type TShippingMethodsProps = {
    items: TAvailableShippingMethod[];
    selected: TSelectedShippingMethod;
    onSelect: (item: TAvailableShippingMethod) => void;
};

const ShippingMethods: FunctionComponent<TShippingMethodsProps> = ({
    items,
    selected,
    onSelect
}) => {
    const { t } = useTranslation();

    return (
        <Table className="table-step-shipping">
            <tbody>
                {items.map(item => {
                    const {
                        available,
                        carrier_code: carrierCode,
                        carrier_title: carrierTitle,
                        method_title: methodTitle,
                        method_code: methodCode,
                        amount: { currency: currencyCode, value: price }
                    } = item;
                    return (
                        <tr key={carrierCode + methodCode}>
                            <td>
                                <Form.Check
                                    type="radio"
                                    name="method"
                                    checked={
                                        carrierCode ===
                                            (selected || {}).carrier_code &&
                                        methodCode ===
                                            (selected || {}).method_code
                                    }
                                    onChange={() => onSelect(item)}
                                    disabled={!available}
                                />
                            </td>
                            <td>
                                <strong>
                                    {currencyCode ? (
                                        <Price
                                            currencyCode={currencyCode}
                                            value={price || 0}
                                        />
                                    ) : null}
                                </strong>
                            </td>
                            <td>{methodTitle && t(methodTitle)}</td>
                            <td>{t(carrierTitle)}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default ShippingMethods;