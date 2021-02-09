import { useEffect } from 'react';
import { getSearchParam } from '@magento/peregrine/lib/hooks/useSearchParam';
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';

import { useMenuContext } from 'src/peregrine/lib/context/adeoweb/menu';

export const useMenu = ({ getMenuQuery }) => {
    const [{ loadingError, children }, { getMenu }] = useMenuContext();

    const fetchMenu = useAwaitQuery(getMenuQuery);

    useEffect(() => {
        getMenu({
            fetchMenu
        });
    }, [getMenu, fetchMenu]);

    return {
        error: loadingError,
        children
    };
};