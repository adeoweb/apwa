import React, { Fragment, FunctionComponent } from 'react';
import { Link } from 'src/lib/drivers';
import { useTranslation } from 'react-i18next';
import PdfIcons from 'src/lib/assets/icons/PdfIcons';
import { IOrdersListProps } from 'src/lib/components/Customer/pages/OrdersPage/OrdersListTypes';

const OrdersListMobile: FunctionComponent<IOrdersListProps> = ({
    orders,
    createDetailsUrl
}) => {
    const { t } = useTranslation();

    return (
        <Fragment>
            {orders.map(
                ({
                    id,
                    created_at: createdAt,
                    grand_total: grandTotal,
                    order_number: orderNumber,
                    status
                }) => {
                    if (!id) {
                        return;
                    }

                    const detailsUrl = createDetailsUrl(id);

                    return (
                        <div key={id} className="customer-orders-mobile-block">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>{t('Order No.')}</th>
                                        <td>
                                            <Link to={detailsUrl}>
                                                {orderNumber}
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{t('Status')}</th>
                                        <td>{status}</td>
                                    </tr>
                                    <tr>
                                        <th>{t('Invoice')}</th>
                                        <td>
                                            <PdfIcons />
                                            {/* TODO: display link to file, with file name as title, when backend done */}
                                            {orderNumber}.pdf
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>{t('Order Total')}</th>
                                        <td>{grandTotal}</td>
                                    </tr>
                                    <tr>
                                        <th>{t('Date')}</th>
                                        <td>{createdAt}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <Link
                                to={detailsUrl}
                                className="customer-orders-details"
                            >
                                {t('Open')}
                            </Link>
                        </div>
                    );
                }
            )}
        </Fragment>
    );
};

export default OrdersListMobile;
