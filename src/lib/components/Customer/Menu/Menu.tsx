import React, { FunctionComponent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { CustomerRoutes } from 'src/lib/components/Customer/CustomerRoutes';
import { Link, useLocation } from 'src/lib/drivers';

const Menu: FunctionComponent = () => {
    const location = useLocation();
    const { t } = useTranslation(['customer', 'address']);

    const isActive = useCallback(
        (route: string) => {
            return location.pathname.indexOf(route) === 0;
        },
        [location.pathname]
    );

    return (
        <div className="widget widget-dashboard">
            <h3 className="widget-title">{t('customer:My Account')}</h3>

            <ul className="list">
                <li
                    className={
                        isActive(CustomerRoutes.account.url)
                            ? 'active'
                            : undefined
                    }
                >
                    <Link to={CustomerRoutes.account.url}>
                        {t('customer:Account Information')}
                    </Link>
                </li>
                <li
                    className={
                        isActive(CustomerRoutes.shipping.url)
                            ? 'active'
                            : undefined
                    }
                >
                    <Link to={CustomerRoutes.shipping.url}>
                        {t('address:Shipping Information')}
                    </Link>
                </li>
                <li
                    className={
                        isActive(CustomerRoutes.billing.url)
                            ? 'active'
                            : undefined
                    }
                >
                    <Link to={CustomerRoutes.billing.url}>
                        {t('address:Billing Information')}
                    </Link>
                </li>
                <li
                    className={
                        isActive(CustomerRoutes.newsletters.url)
                            ? 'active'
                            : undefined
                    }
                >
                    <Link to={CustomerRoutes.newsletters.url}>
                        {t('customer:Newsletters')}
                    </Link>
                </li>
                <li
                    className={
                        isActive(CustomerRoutes.orders.url)
                            ? 'active'
                            : undefined
                    }
                >
                    <Link to={CustomerRoutes.orders.url}>
                        {t('customer:My Orders')}
                    </Link>
                </li>
                <li
                    className={
                        isActive(CustomerRoutes.wishlist.url)
                            ? 'active'
                            : undefined
                    }
                >
                    <Link to={CustomerRoutes.wishlist.url}>
                        {t('customer:My Wishlist')}
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Menu;
