import React, {
    Fragment,
    FunctionComponent,
    useCallback,
    useEffect,
    useState
} from 'react';

import { CustomerAddressSelect } from 'src/lib/components/Customer';
import { useCartContext } from 'src/peregrine/lib/context/adeoweb/cart';
import { useUserContext } from 'src/peregrine/lib/context/adeoweb/user';

type TLoggedInUserFormProps = {
    submitAddress: (id: number) => void;
};

const LoggedInUserForm: FunctionComponent<TLoggedInUserFormProps> = ({
    submitAddress
}) => {
    const [
        {
            details: { shipping_addresses: shippingAddresses }
        }
    ] = useCartContext();
    const customerAddressIdOnCart =
        shippingAddresses && shippingAddresses.length > 0
            ? shippingAddresses[0]?.customer_address_id
            : null;
    const [
        {
            currentUser: { addresses = [] }
        }
    ] = useUserContext();

    const defaultShippingAddress = addresses.find(
        address => address?.default_shipping
    );

    const [selectedAddressId, setSelectedAddressId] = useState(
        customerAddressIdOnCart ||
            (defaultShippingAddress && defaultShippingAddress.id) ||
            null
    );

    const onAddressSelect = useCallback(
        id => {
            if (id) {
                setSelectedAddressId(id);
            }
        },
        [setSelectedAddressId]
    );

    useEffect(() => {
        if (customerAddressIdOnCart) {
            setSelectedAddressId(customerAddressIdOnCart);
        }
    }, [customerAddressIdOnCart, setSelectedAddressId]);

    useEffect(() => {
        if (
            selectedAddressId &&
            selectedAddressId !== customerAddressIdOnCart
        ) {
            submitAddress(selectedAddressId);
        }
    }, [selectedAddressId, customerAddressIdOnCart, submitAddress]);

    return (
        <Fragment>
            <CustomerAddressSelect
                selectedAddressId={selectedAddressId}
                onAddressSelect={onAddressSelect}
                isForShipping={true}
            />
        </Fragment>
    );
};

export default LoggedInUserForm;
