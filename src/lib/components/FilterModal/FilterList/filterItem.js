import { bool, func, number, oneOfType, shape, string } from 'prop-types';

import React, { useCallback, useMemo } from 'react';

import setValidator from '@magento/peregrine/lib/validators/set';

import Swatch from '../../ProductOptions/Swatch';
import FilterDefault from './filterDefault';

const FilterItem = props => {
    const { filterApi, filterState, group, isSwatch, item } = props;
    const { toggleItem } = filterApi;
    const { title, value } = item;
    const isSelected = filterState && filterState.has(item);
    const Tile = isSwatch ? Swatch : FilterDefault;

    // create and memoize an item that matches the tile interface
    const tileItem = useMemo(
        () => ({
            label: title,
            value_index: value
        }),
        [title, value]
    );

    const handleClick = useCallback(() => {
        toggleItem({ group, item });
    }, [group, item, toggleItem]);

    return (
        <Tile
            isSelected={isSelected}
            item={tileItem}
            onClick={handleClick}
            title={title}
            value={value}
        />
    );
};

export default FilterItem;

FilterItem.propTypes = {
    filterApi: shape({
        toggleItem: func.isRequired
    }).isRequired,
    filterState: setValidator,
    group: string.isRequired,
    isSwatch: bool,
    item: shape({
        title: string.isRequired,
        value: oneOfType([number, string]).isRequired
    }).isRequired
};
