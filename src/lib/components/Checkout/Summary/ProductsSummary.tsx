import React, { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SummaryWrapper from 'src/lib/components/Checkout/Summary/SummaryWrapper';
import { Table } from 'react-bootstrap';
import { useCartContext } from 'src/peregrine/lib/context/adeoweb/cart';
import { Price } from '@magento/peregrine';
import ProductRow from 'src/lib/components/Checkout/Summary/ProductRow';

const ProductsSummary: FunctionComponent = () => {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(true);
    const [
        {
            details: { items },
            derivedDetails: { numItems, subtotal, currencyCode }
        }
    ] = useCartContext();

    return (
        <SummaryWrapper>
            <h4>
                <button
                    aria-expanded={isExpanded}
                    className={!isExpanded ? 'collapsed' : ''}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {`${t('Products in Cart:')} ${numItems}`}
                </button>
            </h4>
            <div
                id="order-cart-section"
                className={`collapse${isExpanded ? ' show' : ''}`}
            >
                <Table className="table table-mini-cart">
                    <tbody>
                        {Boolean(items) &&
                            Array.isArray(items) &&
                            items.length > 0 &&
                            items.map(item => (
                                <ProductRow
                                    key={item.id}
                                    item={item}
                                    currencyCode={currencyCode}
                                />
                            ))}
                        <tr>
                            <td className="align-middle">
                                <strong>{t('Order Total')}</strong>
                            </td>
                            <td className="price-col">
                                <strong>
                                    <Price
                                        value={subtotal}
                                        currencyCode={currencyCode}
                                    />
                                </strong>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </SummaryWrapper>
    );
};

export default ProductsSummary;