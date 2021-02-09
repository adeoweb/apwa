import React, { Fragment, FunctionComponent } from 'react';
import { Redirect } from 'src/lib/drivers';
import { useIsSignedIn } from 'src/peregrine/lib/talons/adeoweb/IsSignedIn/useIsSignedIn';
import RouterRoutes from 'src/lib/RouterRoutes/RouterRoutes';

const NotAuthUserToLogin: FunctionComponent = ({ children }) => {
    const { isSignedIn } = useIsSignedIn();

    if (!isSignedIn) {
        return <Redirect to={RouterRoutes.loginPage.url} />;
    }

    return <Fragment>{children}</Fragment>;
};

export default NotAuthUserToLogin;