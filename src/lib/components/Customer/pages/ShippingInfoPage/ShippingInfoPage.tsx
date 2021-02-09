import React, { FunctionComponent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'src/lib/drivers';
import { CustomerRoutes } from 'src/lib/components/Customer/CustomerRoutes';
import { Button, Col, Row } from 'react-bootstrap';
import { useUserContext } from 'src/peregrine/lib/context/adeoweb/user';
import AddressCard from 'src/lib/components/Customer/AddressCard';
import GET_CUSTOMER_QUERY from 'src/lib/queries/getCustomer.graphql';
import UPDATE_CUSTOMER_ADDRESS_MUTATION from 'src/lib/queries/updateCustomerAddress.graphql';
import DELETE_CUSTOMER_ADDRESS_MUTATION from 'src/lib/queries/deleteCustomerAddress.graphql';
import LoadingIndicator from 'src/lib/components/LoadingIndicator';
import { useDeleteCustomerAddress } from 'src/peregrine/lib/talons/adeoweb/Customer/useDeleteCustomerAddress';
import { useSetDefaultCustomerAddress } from 'src/peregrine/lib/talons/adeoweb/Customer/useSetDefaultCustomerAddress';

const ShippingInfoPage: FunctionComponent = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const {
        isDeletingAddress,
        deleteCustomerAddress
    } = useDeleteCustomerAddress({
        deleteCustomerAddressMutation: DELETE_CUSTOMER_ADDRESS_MUTATION
    });
    const {
        isUpdatingAddress,
        setCustomerDefaultAddress
    } = useSetDefaultCustomerAddress({
        updateCustomerAddressMutation: UPDATE_CUSTOMER_ADDRESS_MUTATION,
        getCustomerQuery: GET_CUSTOMER_QUERY,
        shipping: true
    });
    const [
        {
            currentUser: { addresses = [] }
        }
    ] = useUserContext();

    const handleAdd = useCallback(() => {
        history.push(CustomerRoutes.addShipping.url);
    }, [history]);

    const handleEdit = useCallback(
        (id: number) => {
            history.push(CustomerRoutes.editShipping.url + `?id=${id}`);
        },
        [history]
    );

    return (
        <div>
            {(isUpdatingAddress || isDeletingAddress) && <LoadingIndicator />}
            <h3>{t('Shipping information')}</h3>
            <Button
                variant="primary"
                size="sm"
                onClick={handleAdd}
                className="mb-2"
            >
                <i className="fas fa-plus" />
                {t('Add')}
            </Button>

            <Row>
                {addresses.length ? (
                    addresses.map(address => {
                        const {
                            id,
                            default_shipping: defaultShipping,
                            default_billing: defaultBilling
                        } = address;

                        return (
                            <Col key={id} sm={12} lg={6}>
                                <AddressCard
                                    address={address}
                                    isDefault={Boolean(defaultShipping)}
                                    onEdit={handleEdit}
                                    onDelete={deleteCustomerAddress}
                                    onDefaultChange={setCustomerDefaultAddress}
                                    isDeleteAllowed={
                                        !defaultShipping && !defaultBilling
                                    }
                                />
                            </Col>
                        );
                    })
                ) : (
                    <p className="text-center">
                        {t('No shipping information')}
                    </p>
                )}
            </Row>
        </div>
    );
};

export default ShippingInfoPage;