import React, { createContext, useContext, useMemo } from 'react';
import { connect } from 'react-redux';

import appActions from 'src/peregrine/lib/store/actions/adeoweb/app';

const ErrorContext = createContext();

const ErrorContextProvider = props => {
    const { children, markErrorHandled, unhandledErrors } = props;

    const errorApi = useMemo(
        () => ({
            markErrorHandled
        }),
        [markErrorHandled]
    );

    const contextValue = useMemo(
        () => [unhandledErrors, errorApi],
        [errorApi, unhandledErrors]
    );

    return (
        <ErrorContext.Provider value={contextValue}>
            {children}
        </ErrorContext.Provider>
    );
};

const mapStateToProps = ({ unhandledErrors }) => ({ unhandledErrors });

const mapDispatchToProps = {
    markErrorHandled: appActions.markErrorHandled
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorContextProvider);

export const useErrorContext = () => useContext(ErrorContext);
