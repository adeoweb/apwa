import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import DetailsAccordion from 'src/lib/components/Customer/pages/OrderDetailsPage/DetailsAccordion';
import { TOrderShippingAddress } from 'src/lib/types/graphql/Customer';
import { useUserContext } from 'src/peregrine/lib/context/adeoweb/user';

interface IDetailsDeliveryProps {
    shippingAddress: TOrderShippingAddress;
}

const DetailsDelivery: FunctionComponent<IDetailsDeliveryProps> = ({
    shippingAddress
}) => {
    const { t } = useTranslation(['customer', 'order']);
    const [{ currentUser }] = useUserContext();

    if (!shippingAddress) {
        return null;
    }

    const {
        firstname,
        lastname,
        telephone,
        customer_notes: customerNotes,
        street: customerStreet,
        city: customerCity,
        postcode: customerPostcode
    } = shippingAddress;

    // TODO: get customer email for order from backend
    const email = (currentUser && currentUser.email) || null;

    return (
        <DetailsAccordion
            title={t('order:Delivery Information')}
            contentContainerClass="customer-order-delivery"
        >
            <div className="customer-order-delivery-recipient">
                <div className="customer-order-delivery-info-block">
                    <div className="customer-order-font-description">
                        {`${t('customer:First Name')}, ${t(
                            'customer:Last Name'
                        )}`}
                    </div>
                    <div className="customer-order-font-info">{`${firstname} ${lastname}`}</div>
                </div>
                <div className="customer-order-delivery-info-block">
                    <div className="customer-order-font-description">
                        {t('customer:Email')}
                    </div>
                    <div className="customer-order-font-info">{email}</div>
                </div>
                <div className="customer-order-delivery-info-block">
                    <div className="customer-order-font-description">
                        {t('customer:Phone Number')}
                    </div>
                    <div className="customer-order-font-info">{telephone}</div>
                </div>
            </div>
            <div>
                {/* TODO: uncomment when readdy */}
                {/*<div className="customer-order-font-emphasised">*/}
                {/*    /!* TODO: add courier logo and tittle *!/*/}
                {/*    Courier title*/}
                {/*</div>*/}
                <div className="customer-order-delivery-location">
                    <div className="customer-order-delivery-info-block">
                        <div className="customer-order-font-description">
                            {t('customer:Address')}
                        </div>
                        <div className="customer-order-font-info">
                            {`${customerStreet}, ${customerCity}, ${customerPostcode}`}
                        </div>
                    </div>
                    <div className="customer-order-delivery-info-block">
                        <div className="customer-order-font-description">
                            {t('customer:Phone Number')}
                        </div>
                        {customerNotes && (
                            <div className="customer-order-font-info">
                                {customerNotes}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DetailsAccordion>
    );
};

export default DetailsDelivery;
