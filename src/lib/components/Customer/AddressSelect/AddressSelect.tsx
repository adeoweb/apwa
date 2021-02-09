import React, {
    Fragment,
    FunctionComponent,
    useCallback,
    useEffect,
    useState
} from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import {
    CustomerAddressForm,
    CustomerAddressList,
    TCustomerAddressFormValues
} from 'src/lib/components/Customer';
import { useCustomerAddressForm } from 'src/peregrine/lib/talons/adeoweb/Customer/useCustomerAddressForm';
import { useUserContext } from 'src/peregrine/lib/context/adeoweb/user';
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';
import CREATE_CUSTOMER_ADDRESS_MUTATION from 'src/lib/queries/createCustomerAddress.graphql';
import GET_ALL_COUNTRIES from 'src/lib/queries/getAllCountries.graphql';
import GET_CUSTOMER_QUERY from 'src/lib/queries/getCustomer.graphql';
import { TCustomer } from 'src/lib/types/graphql/Customer';
import { OperationVariables } from '@apollo/client';
import { fetchPolicy } from 'src/peregrine/lib/util/adeoweb/fetchPolicy';

type TAddressSelectProps = {
    selectedAddressId?: number | null;
    onAddressSelect: (id: number) => void;
    isForBilling?: boolean;
    isForShipping?: boolean;
};

const AddressSelect: FunctionComponent<TAddressSelectProps> = ({
    selectedAddressId,
    onAddressSelect,
    isForBilling = false,
    isForShipping = false
}) => {
    const { t } = useTranslation();
    const [showAddAddress, setShowAddAddress] = useState(false);
    const fetchUserDetails = useAwaitQuery<TCustomer, OperationVariables>(
        GET_CUSTOMER_QUERY
    );
    const [createCustomerAddressQuery] = useMutation(
        CREATE_CUSTOMER_ADDRESS_MUTATION,
        {
            fetchPolicy: fetchPolicy.mutations.default
        }
    );

    const [
        {
            currentUser: { addresses = [] },
            isCreatingAddress
        },
        { createCustomerAddress }
    ] = useUserContext();

    const hideAddAddressForm = useCallback(() => {
        setShowAddAddress(false);
    }, [setShowAddAddress]);

    const handleSubmitNewAddress = useCallback(
        async values => {
            await createCustomerAddress({
                address: values,
                createCustomerAddress: createCustomerAddressQuery,
                fetchUserDetails
            });
            hideAddAddressForm();
        },
        [
            createCustomerAddress,
            createCustomerAddressQuery,
            fetchUserDetails,
            hideAddAddressForm
        ]
    );

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        resetForm,
        values,
        errors,
        touched,
        countries,
        regions,
        isValid,
        isDirty
    } = useCustomerAddressForm<TCustomerAddressFormValues>({
        countriesQuery: GET_ALL_COUNTRIES,
        onSubmit: handleSubmitNewAddress
    });

    const showAddAddressForm = useCallback(() => {
        setShowAddAddress(true);
        resetForm();
    }, [setShowAddAddress, resetForm]);

    const handleAddressSelect = useCallback(
        e => {
            if (e.target.value) {
                onAddressSelect(parseInt(e.target.value, 10));
            }
        },
        [onAddressSelect]
    );

    useEffect(() => {
        if (addresses.length === 0 && !showAddAddress) {
            showAddAddressForm();
        }
    }, [addresses.length, showAddAddress, showAddAddressForm]);

    return (
        <Fragment>
            {!showAddAddress && (
                <Fragment>
                    <div className="mt-2" />
                    <CustomerAddressList
                        addresses={addresses}
                        onChange={handleAddressSelect}
                        selectedAddressId={selectedAddressId}
                    />
                    <Button onClick={showAddAddressForm}>
                        {t('Add new address')}
                    </Button>
                </Fragment>
            )}
            {showAddAddress && (
                <Fragment>
                    <CustomerAddressForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        values={values}
                        errors={errors}
                        touched={touched}
                        countries={countries}
                        regions={regions}
                        isForBilling={isForBilling}
                        isForShipping={isForShipping}
                    />
                    <div className="form-footer">
                        <Button
                            variant="primary"
                            disabled={!isValid || !isDirty || isCreatingAddress}
                            onClick={() => handleSubmit()}
                        >
                            {t('Submit')}
                        </Button>
                        {addresses.length > 0 && (
                            <Button
                                variant="secondary"
                                onClick={hideAddAddressForm}
                            >
                                {t('Cancel')}
                            </Button>
                        )}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default AddressSelect;