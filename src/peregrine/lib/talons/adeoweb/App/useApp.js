import { useCallback, useEffect, useMemo, useState } from 'react';
import errorRecord from '@magento/peregrine/lib/util/createErrorRecord';

import { useHistory } from 'src/lib/drivers';
import { useAppContext } from '../../../context/adeoweb/app';
import { useMessageCardContext } from 'src/peregrine/lib/context/adeoweb/messageCard';

const dismissers = new WeakMap();

// Memoize dismisser funcs to reduce re-renders from func identity change.
const getErrorDismisser = (error, onDismissError) => {
    return dismissers.has(error)
        ? dismissers.get(error)
        : dismissers.set(error, () => onDismissError(error)).get(error);
};

/**
 * Talon that handles effects for App and returns props necessary for rendering
 * the app.
 *
 * @param {Function} props.handleError callback to invoke for each error
 * @param {Function} props.handleIsOffline callback to invoke when the app goes offline
 * @param {Function} props.handleIsOnline callback to invoke wen the app goes online
 * @param {Function} props.handleHTMLUpdate callback to invoke when a HTML update is available
 * @param {Function} props.markErrorHandled callback to invoke when handling an error
 * @param {Function} props.renderError an error that occurs during rendering of the app
 * @param {Function} props.unhandledErrors errors coming from the error reducer
 *
 * @returns {{
 *  hasOverlay: boolean
 *  handleCloseDrawer: function
 * }}
 */
export const useApp = props => {
    const {
        handleError,
        handleIsOffline,
        handleIsOnline,
        handleHTMLUpdate,
        markErrorHandled,
        renderError,
        unhandledErrors
    } = props;

    const [isHTMLUpdateAvailable, setHTMLUpdateAvailable] = useState(false);

    const resetHTMLUpdateAvailable = useCallback(
        () => setHTMLUpdateAvailable(false),
        [setHTMLUpdateAvailable]
    );

    const reload = useCallback(
        process.env.NODE_ENV === 'development'
            ? () => {
                  console.log(
                      'Default window.location.reload() error handler not running in developer mode.'
                  );
              }
            : () => {
                  window.location.reload();
              },
        []
    );

    const renderErrors = useMemo(
        () =>
            renderError
                ? [errorRecord(renderError, window, useApp, renderError.stack)]
                : [],
        [renderError]
    );

    const errors = renderError ?? unhandledErrors ?? [];
    const handleDismissError = renderError ? reload : markErrorHandled;

    // Only add toasts for errors if the errors list changes. Since `addToast`
    // and `toasts` changes each render we cannot add it as an effect dependency
    // otherwise we infinitely loop.
    useEffect(() => {
        for (const { error, id, loc } of errors) {
            handleError(
                error,
                id,
                loc,
                getErrorDismisser(error, handleDismissError)
            );
        }
    }, [errors, handleDismissError, handleError]);

    const [appState, appApi] = useAppContext();
    const { closeDrawer, hideCustomerModal } = appApi;
    const { hasBeenOffline, isOnline, overlay, customerModalType } = appState;

    useEffect(() => {
        if (hasBeenOffline) {
            if (isOnline) {
                handleIsOnline();
            } else {
                handleIsOffline();
            }
        }
    }, [handleIsOnline, handleIsOffline, hasBeenOffline, isOnline]);

    useEffect(() => {
        if (isHTMLUpdateAvailable) {
            handleHTMLUpdate(resetHTMLUpdateAvailable);
        }
    }, [isHTMLUpdateAvailable, handleHTMLUpdate, resetHTMLUpdateAvailable]);

    const handleCloseDrawer = useCallback(() => {
        closeDrawer();
    }, [closeDrawer]);

    const [{ messageBlocks }, { clearAllMessages }] = useMessageCardContext();

    const { listen: addHistoryListener } = useHistory();

    useEffect(() => {
        const handleHistoryChange = () => {
            const blocksWithMessages = Object.keys(messageBlocks).filter(
                blockKey => {
                    const block = messageBlocks[blockKey];
                    return Array.isArray(block) && block.length;
                }
            );

            if (blocksWithMessages.length) {
                clearAllMessages();
            }
        };

        const removeHistoryListener = addHistoryListener(handleHistoryChange);

        return () => {
            removeHistoryListener();
        };
    }, [messageBlocks, clearAllMessages, addHistoryListener]);

    return {
        hasOverlay: !!overlay,
        handleCloseDrawer,
        setHTMLUpdateAvailable,
        hideCustomerModal,
        customerModalType
    };
};
