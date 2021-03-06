import React, { Fragment, FunctionComponent } from 'react';

import AddToWishlist from 'src/lib/components/AddToWishlist';
import { AddToCompare } from 'src/lib/components/Compare';
import Image from 'src/lib/components/Image';
import PriceBox from 'src/lib/components/PriceBox';
import { CustomerModalTypes } from 'src/lib/constants/customer';
import { Link } from 'src/lib/drivers';
import { TCategoryInterface } from 'src/lib/types/graphql/Category';
import { TProduct } from 'src/lib/types/graphql/Product';
import getItemUrl from 'src/lib/util/getItemUrl';
import { useAppContext } from 'src/peregrine/lib/context/adeoweb/app';

import AddToCart from './AddToCart';
import ProductTitle from './ProductTitle';

interface IProductItemProps {
    product: TProduct;
    category?: TCategoryInterface;
}

const ProductItem: FunctionComponent<IProductItemProps> = ({
    product,
    category
}) => {
    const [, { setCustomerModal }] = useAppContext();
    const { name, small_image: smallImage, price_range: priceRange } = product;
    const itemUrl = getItemUrl(product, category);
    const itemName = name || '';
    let imageLabel = '';
    let imageUrl;

    if (smallImage) {
        if (smallImage.label) {
            imageLabel = smallImage.label;
        }
        if (smallImage.url) {
            imageUrl = smallImage.url;
        }
    }

    const handleNotLoggedIn = () => {
        setCustomerModal(CustomerModalTypes.LOG_IN);
    };

    return (
        <Fragment>
            <figure>
                <Link to={itemUrl}>
                    <Image
                        resource={'small_image'}
                        alt={imageLabel}
                        src={imageUrl}
                        width={280}
                        height={300}
                    />
                </Link>
            </figure>
            <div className="product-details">
                <ProductTitle name={itemName} itemUrl={itemUrl} />
                <PriceBox priceRange={priceRange} />
                <div className="product-action">
                    <AddToWishlist
                        product={product}
                        handleNotLoggedIn={handleNotLoggedIn}
                        isProductAction
                    />
                    <AddToCart product={product} />
                    <AddToCompare product={product} />
                </div>
            </div>
        </Fragment>
    );
};

export default ProductItem;
