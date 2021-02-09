import * as React from 'react';
import { DocumentNode } from 'graphql';
import { FormikErrors, FormikTouched } from 'formik';
import { TCountry, TRegion } from 'src/lib/types/graphql/Country';
import { TCustomerAddressFormValues } from 'src/lib/components/Customer';

type TUseCreateCustomerAddressProps = {
    countriesQuery: DocumentNode;
    getCustomerQuery: DocumentNode;
    createCustomerAddressMutation: DocumentNode;
};

type TUseCreateCustomerAddress = {
    handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
    handleChange: (
        eventOrPath: string | React.ChangeEvent<any>
    ) => void | ((eventOrTextValue: string | React.ChangeEvent<any>) => void);
    handleBlur: (eventOrString: any) => void | ((e: any) => void);
    values: TCustomerAddressFormValues;
    errors: FormikErrors<TCustomerAddressFormValues>;
    touched: FormikTouched<TCustomerAddressFormValues>;
    countries: TCountry[];
    regions: TRegion[];
    isDirty: boolean;
    isValid: boolean;
    isSubmitted: boolean;
    isCreatingAddress: boolean;
    createAddressError: string | null;
};

export function useCreateCustomerAddress(
    props: TUseCreateCustomerAddressProps
): TUseCreateCustomerAddress;