import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState
} from 'react';

import { CustomerModalTypes } from 'src/lib/constants/customer';
import { useHistory } from 'src/lib/drivers';
import { useMessageCardContext } from 'src/peregrine/lib/context/adeoweb/messageCard';

import { useAppContext } from '../../../context/adeoweb/app';

const dismissers = new WeakMap();

// Memoize dismisser funcs to reduce re-renders from func identity change.
const getErrorDismisser = (error, onDismissError) => {
    return dismissers.has(error)
        ? dismissers.get(error)
        : dismissers.set(error, () => onDismissError(error)).get(error);
};

interface IUseAppProps {
    handleError: (
        error: Error,
        id: string,
        loc: string,
        errorDismisser: () => void
    ) => void;
    handleIsOffline: () => void;
    handleIsOnline: () => void;
    handleHTMLUpdate: (cb: () => void) => void;
    markErrorHandled: () => void;
    unhandledErrors?: {
        error: Error;
        id: string;
        loc: string;
    }[];
}

type TUseApp = {
    hasOverlay: boolean;
    handleCloseDrawer: () => void;
    setHTMLUpdateAvailable: Dispatch<SetStateAction<boolean>>;
    hideCustomerModal: () => Promise<void>;
    customerModalType: CustomerModalTypes | null;
};
export const useApp = (props: IUseAppProps): TUseApp => {
    const {
        handleError,
        handleIsOffline,
        handleIsOnline,
        handleHTMLUpdate,
        markErrorHandled,
        unhandledErrors
    } = props;

    const [isHTMLUpdateAvailable, setHTMLUpdateAvailable] = useState(false);

    const resetHTMLUpdateAvailable = useCallback(
        () => setHTMLUpdateAvailable(false),
        [setHTMLUpdateAvailable]
    );

    // Only add toasts for errors if the errors list changes. Since `addToast`
    // and `toasts` changes each render we cannot add it as an effect dependency
    // otherwise we infinitely loop.
    useEffect(() => {
        if (!unhandledErrors) {
            return;
        }

        for (const { error, id, loc } of unhandledErrors) {
            handleError(
                error,
                id,
                loc,
                getErrorDismisser(error, markErrorHandled)
            );
        }
    }, [unhandledErrors, markErrorHandled, handleError]);

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
