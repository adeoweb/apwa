import React, { FunctionComponent } from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Logo from 'src/lib/components/Logo';
import { Link } from 'src/lib/drivers';

const CheckoutHeader: FunctionComponent = () => {
    const { t } = useTranslation('navigation');

    return (
        <Container className="checkout-header">
            <Link to={'/'}>
                <Logo />
            </Link>
            <Link to="/">{t('< Back to homepage')}</Link>
        </Container>
    );
};

export default CheckoutHeader;
