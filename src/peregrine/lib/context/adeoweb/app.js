import React, { createContext, useContext, useMemo } from 'react';
import { connect } from 'react-redux';

import bindActionCreators from '@magento/peregrine/lib/util/bindActionCreators';

import actions from '../../store/actions/adeoweb/app/actions';
import * as asyncActions from '../../store/actions/adeoweb/app/asyncActions';

const AppContext = createContext([undefined, undefined]);

const AppContextProvider = props => {
    const { actions, appState, asyncActions, children } = props;

    const appApi = useMemo(
        () => ({
            actions,
            ...asyncActions
        }),
        [actions, asyncActions]
    );

    const contextValue = useMemo(() => [appState, appApi], [appApi, appState]);
    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

const mapStateToProps = ({ app }) => ({ appState: app });

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
    asyncActions: bindActionCreators(asyncActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContextProvider);

export const useAppContext = () => useContext(AppContext);
