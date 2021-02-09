import {
    TAvailableShippingMethod,
    TCart,
    TCartAddressInput
} from 'src//lib/types/graphql/Cart';
import { TShippingAddressFormValues } from 'src//lib/components/Checkout/Shipping';
import { TPaymentMethodInput } from 'src//lib/types/SetPaymentMethodOnCart';
import { TFetchCartId } from 'src/peregrine/lib/store/actions/adeoweb/cart/asyncActions';
import { TOrder } from 'src//lib/types/graphql/Order';
import { ExecutionResult, MutationFunctionOptions } from '@apollo/react-common';
import { QueryOptions } from '@apollo/react-hooks';
import { ApolloQueryResult, OperationVariables } from '@apollo/client';

interface IInitCheckoutPayload {
    setShippingAddressesOnCart: (
        options?: MutationFunctionOptions<TCart>
    ) => Promise<ExecutionResult<TCart>>;
    fetchCartDetails: (
        options: QueryOptions<OperationVariables>
    ) => Promise<ApolloQueryResult<TCart>>;
    fetchCartId: (
        options: QueryOptions<OperationVariables>
    ) => Promise<ApolloQueryResult<TFetchCartId>>;
}

interface ISubmitShippingAddressPayload {
    customerAddressId?: number;
    formValues?: TShippingAddressFormValues;
    setGuestEmail: (
        options?: MutationFunctionOptions<TCart>
    ) => Promise<ExecutionResult<TCart>>;
    setShippingAddressesOnCart: (
        options?: MutationFunctionOptions<TCart>
    ) => Promise<ExecutionResult<TCart>>;
}

interface ISubmitShippingMethodPayload {
    shippingMethod: TAvailableShippingMethod;
    setShippingMethodOnCart: Promise<TCart>;
}

interface ISubmitBillingAddressPayload {
    billingAddress: TCartAddressInput;
    setBillingAddressOnCart: Promise<TCart>;
}

interface ISubmitPaymentMethodPayload {
    paymentMethod: TPaymentMethodInput;
    setPaymentMethodOnCart: Promise<TCart>;
}

interface ISubmitOrder {
    fetchCartId: Promise<TFetchCartId>;
    placeOrder: Promise<TOrder>;
}

interface IApplyCouponPayload {
    couponCode: string;
    applyCouponToCart: (
        options?: MutationFunctionOptions<TCart>
    ) => Promise<ExecutionResult<TCart>>;
}

interface IRemoveCouponPayload {
    removeCouponFromCart: (
        options?: MutationFunctionOptions<TCart>
    ) => Promise<ExecutionResult<TCart>>;
}

interface ISubmitEstimateAddressPayload {
    formValues: TCartAddressInput;
    setShippingAddressesOnCart: (
        options?: MutationFunctionOptions<TCart>
    ) => Promise<ExecutionResult<TCart>>;
}

export type TCheckoutAsyncActions = {
    initCheckout(payload: IInitCheckoutPayload): Promise<void>;
    submitShippingAddress(
        payload: ISubmitShippingAddressPayload
    ): Promise<void>;
    submitShippingMethod(payload: ISubmitShippingMethodPayload): Promise<void>;
    submitBillingAddress(payload: ISubmitBillingAddressPayload): Promise<void>;
    submitPaymentMethod(payload: ISubmitPaymentMethodPayload): Promise<void>;
    submitOrder(payload: ISubmitOrder): Promise<void>;
    resetReceipt(): Promise<void>;
    applyCoupon(payload: IApplyCouponPayload): Promise<void>;
    removeCoupon(payload: IRemoveCouponPayload): Promise<void>;
    submitEstimateAddress(
        payload: ISubmitEstimateAddressPayload
    ): Promise<void>;
};