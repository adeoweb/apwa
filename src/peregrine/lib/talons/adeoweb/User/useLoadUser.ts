import { DocumentNode } from 'graphql';

import { useEffect } from 'react';

import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';

import { useUserContext } from 'src/peregrine/lib/context/adeoweb/user';

type TUseLoadUserProps = {
    getUserDetailsQuery: DocumentNode;
};

type TUseLoadUser = {
    error: string | null;
};

export const useLoadUser = ({
    getUserDetailsQuery
}: TUseLoadUserProps): TUseLoadUser => {
    const [{ getDetailsError }, { getUserDetails }] = useUserContext();
    const fetchUserDetails = useAwaitQuery(getUserDetailsQuery);

    useEffect(() => {
        getUserDetails({ fetchUserDetails });
    }, [getUserDetails, fetchUserDetails]);

    return {
        error: getDetailsError
    };
};
