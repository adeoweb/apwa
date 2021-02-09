import { useCallback, useEffect } from 'react';
import { useUserContext } from '../../../context/adeoweb/user';
import { useMessageCardContext } from 'src/peregrine/lib/context/adeoweb/messageCard';
import { useMutation } from '@apollo/react-hooks';
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';
import { fetchPolicy } from 'src/peregrine/lib/util/adeoweb/fetchPolicy';
import MessageType from 'src/lib/constants/message';

export const useSignIn = ({
    signInMutation,
    customerQuery,
    getCustomerCartQuery,
    mergeCartsMutation,
    signOutMutation
}) => {
    const [
        {
            isSigningIn,
            isSignedIn,
            signInError,
            isGettingDetails,
            getDetailsError
        },
        { signIn }
    ] = useUserContext();

    const [, { addMessage }] = useMessageCardContext();

    const [mergeCartsRequest] = useMutation(mergeCartsMutation, {
        fetchPolicy: fetchPolicy.mutations.default
    });
    const [signInRequest] = useMutation(signInMutation, {
        fetchPolicy: fetchPolicy.mutations.default
    });
    const fetchUserDetails = useAwaitQuery(customerQuery);
    const fetchCustomerCart = useAwaitQuery(getCustomerCartQuery);
    const [revokeToken] = useMutation(signOutMutation, {
        fetchPolicy: fetchPolicy.mutations.default
    });

    useEffect(() => {
        if (signInError) {
            addMessage({
                type: MessageType.ERROR,
                message: signInError
            });
        }
    }, [signInError, addMessage]);

    useEffect(() => {
        if (getDetailsError) {
            addMessage({
                type: MessageType.ERROR,
                message: getDetailsError
            });
        }
    }, [getDetailsError, addMessage]);

    const handleSubmit = useCallback(
        async ({ email, password }) => {
            return signIn({
                email,
                password,
                signIn: signInRequest,
                fetchUserDetails,
                fetchCustomerCart,
                mergeCartsRequest,
                revokeToken
            });
        },
        [
            signIn,
            signInRequest,
            fetchUserDetails,
            fetchCustomerCart,
            mergeCartsRequest,
            revokeToken
        ]
    );

    return {
        handleSubmit,
        isBusy: isGettingDetails || isSigningIn,
        isSignedIn
    };
};
