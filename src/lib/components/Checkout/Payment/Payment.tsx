import React, {
    FunctionComponent,
    Fragment,
    useEffect,
    useCallback
} from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Form, FormCheck, Button } from 'react-bootstrap';
import { CheckoutRoutes } from 'src/lib/components/Checkout';
import { ProductsSummary } from 'src/lib/components/Checkout/Summary';
import AddressBlock from 'src/lib/components/Checkout/Address';
import InfoBox from 'src/lib/components/Checkout/InfoBox';
import GET_ALL_COUNTRIES from 'src/lib/queries/getAllCountries.graphql';
import SET_BILLING_ADDRESS_ON_CART_MUTATION from 'src/lib/queries/setBillingAddressOnCart.graphql';
import BillingAddressForm from 'src/lib/components/Checkout/Payment/BillingAdressForm';
import { TBillingAddressFormValues } from 'src/lib/components/Checkout/Payment';
import LoadingIndicator from 'src/lib/components/LoadingIndicator';
import { useHistory } from 'src/lib/drivers';
import PaymentMethodSelect from 'src/lib/components/Checkout/Payment/PaymentMethodSelect';
import { usePaymentStep } from 'src/peregrine/lib/talons/adeoweb/Checkout/usePaymentStep';
import { CustomerAddressSelect } from 'src/lib/components/Customer';

const Payment: FunctionComponent = () => {
    const PREVIOUS_STEP_URL = CheckoutRoutes.shipping.url;
    const NEXT_STEP_URL = CheckoutRoutes.review.url;
    const { t } = useTranslation();
    const history = useHistory();

    const redirectToPrev = useCallback(() => {
        history.push(PREVIOUS_STEP_URL);
    }, [history, PREVIOUS_STEP_URL]);

    const redirectToNext = useCallback(() => {
        history.push(NEXT_STEP_URL);
    }, [history, NEXT_STEP_URL]);

    const {
        handleChange,
        handleBlur,
        handleSameAsShippingChange,
        handleSubmit,
        values,
        errors,
        touched,
        countries,
        regions,
        isSubmitting,
        isSameAsShipping,
        isSubmitEnabled,
        isRedirectToPrev,
        isSignedIn,
        shippingAddress,
        selectedShippingMethod,
        selectedCustomerAddressId,
        onCustomerAddressSelect
    } = usePaymentStep<TBillingAddressFormValues>({
        countriesQuery: GET_ALL_COUNTRIES,
        setBillingAddressOnCartMutation: SET_BILLING_ADDRESS_ON_CART_MUTATION,
        handleSubmitCallback: redirectToNext
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (isRedirectToPrev) {
            redirectToPrev();
        }
    }, [isRedirectToPrev, redirectToPrev]);

    return (
        <Fragment>
            {isSubmitting && <LoadingIndicator />}
            <Row>
                <Col lg={4}>
                    <ProductsSummary />
                    {shippingAddress && (
                        <InfoBox
                            title={t('Ship To:')}
                            editRoute={CheckoutRoutes.shipping.url}
                        >
                            <AddressBlock address={shippingAddress} />
                        </InfoBox>
                    )}
                    {selectedShippingMethod &&
                        selectedShippingMethod.carrier_title &&
                        selectedShippingMethod.method_title && (
                            <InfoBox
                                title={t('Shipping Method:')}
                                editRoute={CheckoutRoutes.shipping.url}
                            >
                                <p>
                                    {t(
                                        `${
                                            selectedShippingMethod.carrier_title
                                        } - ${
                                            selectedShippingMethod.method_title
                                        }`
                                    )}
                                </p>
                            </InfoBox>
                        )}
                </Col>
                <Col lg={8} className="order-lg-first">
                    <div className="checkout-payment">
                        <h2 className="step-title">{t('Payment Method:')}</h2>
                        <PaymentMethodSelect />
                        <h4>{`${t('Check')} / ${t('Money order')}`}</h4>
                        <div className="form-group-custom-control">
                            <Form.Check
                                id="sameAsShippingAddress"
                                custom={true}
                            >
                                <FormCheck.Input
                                    checked={isSameAsShipping}
                                    onChange={handleSameAsShippingChange}
                                />
                                <FormCheck.Label>
                                    {t(
                                        'My billing and shipping address are the same'
                                    )}
                                </FormCheck.Label>
                            </Form.Check>
                        </div>
                        <div
                            id="checkout-shipping-address"
                            className={isSameAsShipping ? 'show' : ''}
                        >
                            {shippingAddress && (
                                <AddressBlock address={shippingAddress} />
                            )}
                        </div>
                        <div
                            id="new-checkout-address"
                            className={!isSameAsShipping ? 'show' : ''}
                        >
                            {!isSignedIn ? (
                                <BillingAddressForm
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    countries={countries}
                                    regions={regions}
                                />
                            ) : (
                                <CustomerAddressSelect
                                    selectedAddressId={
                                        selectedCustomerAddressId
                                    }
                                    onAddressSelect={onCustomerAddressSelect}
                                    isForBilling={true}
                                />
                            )}
                        </div>
                        <div className="clearfix">
                            <Button
                                className="btn btn-primary float-right"
                                disabled={!isSubmitEnabled}
                                onClick={handleSubmit}
                            >
                                {t('Next')}
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Fragment>
    );
};

export default Payment;