import { number, string, shape } from 'prop-types';

import React, { useMemo } from 'react';

import { Link, resourceUrl } from 'src/lib/drivers';
import { useNoProductsFound } from 'src/peregrine/lib/talons/adeoweb/RootComponents/Category';

import { mergeClasses } from '../../classify';
import Image from '../Image';

import defaultClasses from './noProductsFound.css';
import noProductsFound from './noProductsFound.png';

// TODO: get categoryUrlSuffix from graphql storeOptions when it is ready
const categoryUrlSuffix = '.html';

const NoProductsFound = props => {
    const { recommendedCategories } = useNoProductsFound(props);
    const classes = mergeClasses(defaultClasses, props.classes);

    const categoryItems = useMemo(() => {
        return recommendedCategories.map(category => {
            const uri = resourceUrl(
                `/${category.url_path}${categoryUrlSuffix}`
            );

            return (
                <li key={category.id} className={classes.listItem}>
                    <Link to={uri}>{category.name}</Link>
                </li>
            );
        });
    }, [classes, recommendedCategories]);

    return (
        <div className={classes.root}>
            <Image
                alt="Sorry! There are no products in this category."
                classes={{ image: classes.image, root: classes.imageContainer }}
                src={noProductsFound}
            />
            <h2 className={classes.title}>
                Sorry! There are no products in this category
            </h2>
            <div className={classes.categories}>
                <p>Try one of these categories</p>
                <ul className={classes.list}>{categoryItems}</ul>
            </div>
        </div>
    );
};

export default NoProductsFound;

NoProductsFound.propTypes = {
    categoryId: number,
    classes: shape({
        root: string,
        title: string,
        list: string,
        categories: string,
        listItem: string,
        image: string,
        imageContainer: string
    })
};
