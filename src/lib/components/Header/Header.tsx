import React from 'react';

import DesktopMenu from 'src/lib/components/Header/DesktopMenu';
import HeaderContact from 'src/lib/components/Header/HeaderContact';
import MiniCart from 'src/lib/components/Header/MiniCart';
import Logo from 'src/lib/components/Logo';
import SearchBar from 'src/lib/components/SearchBar';
import { Link } from 'src/lib/drivers';
import { useCartTrigger } from 'src/peregrine/lib/talons/adeoweb/Header/useCartTrigger';
import { useHeader } from 'src/peregrine/lib/talons/adeoweb/Header/useHeader';
import { useNavigationTrigger } from 'src/peregrine/lib/talons/adeoweb/Header/useNavigationTrigger';

import CREATE_CART_MUTATION from '../../queries/createCart.graphql';
import GET_CART_DETAILS_QUERY from '../../queries/getCartDetails.graphql';
import TopBar from './TopBar';

const Header = (): JSX.Element => {
    const { handleSearchTriggerClick, searchOpen } = useHeader();
    const { handleOpenNavigation } = useNavigationTrigger();

    useCartTrigger({
        createCartMutation: CREATE_CART_MUTATION,
        getCartDetailsQuery: GET_CART_DETAILS_QUERY
    });

    return (
        <header className="header">
            <TopBar />
            <div className="header-middle">
                <div className="container">
                    <div className="header-left">
                        <Link to={'/'} className="logo">
                            <Logo />
                        </Link>
                    </div>
                    <div className="header-center">
                        <SearchBar
                            handleTriggerClick={handleSearchTriggerClick}
                            isOpen={searchOpen}
                        />
                    </div>

                    <div className="header-right">
                        <button
                            className="mobile-menu-toggler"
                            type="button"
                            onClick={handleOpenNavigation}
                        >
                            <i className="icon-menu" />
                        </button>
                        <HeaderContact />
                        <MiniCart />
                    </div>
                </div>
            </div>
            <div className="sticky-wrapper">
                <div className="header-bottom sticky-header">
                    <div className="container">
                        <Link to={'/'} className="logo">
                            <Logo />
                        </Link>
                        <div className="dropdown cart-dropdown">
                            <a
                                href="/"
                                className="dropdown-toggle"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                data-display="static"
                            >
                                <span className="cart-count">2</span>
                            </a>

                            <div className="dropdown-menu">
                                <div className="dropdownmenu-wrapper">
                                    <div className="dropdown-cart-header">
                                        <span>2 Items</span>

                                        <a href="cart.html">View Cart</a>
                                    </div>
                                    <div className="dropdown-cart-products">
                                        <div className="product">
                                            <div className="product-details">
                                                <h4 className="product-title">
                                                    <a href="product.html">
                                                        Woman Ring
                                                    </a>
                                                </h4>

                                                <span className="cart-product-info">
                                                    <span className="cart-product-qty">
                                                        1
                                                    </span>
                                                    x $99.00
                                                </span>
                                            </div>
                                            <figure className="product-image-container">
                                                <a
                                                    href="product.html"
                                                    className="product-image"
                                                >
                                                    <img
                                                        src="src/lib/assets/images/products/cart/product-1.jpg"
                                                        alt="product"
                                                    />
                                                </a>
                                                <a
                                                    href="/"
                                                    className="btn-remove"
                                                    title="Remove Product"
                                                >
                                                    <i className="icon-cancel" />
                                                </a>
                                            </figure>
                                        </div>
                                        <div className="product">
                                            <div className="product-details">
                                                <h4 className="product-title">
                                                    <a href="product.html">
                                                        Woman Necklace
                                                    </a>
                                                </h4>

                                                <span className="cart-product-info">
                                                    <span className="cart-product-qty">
                                                        1
                                                    </span>
                                                    x $35.00
                                                </span>
                                            </div>
                                            <figure className="product-image-container">
                                                <a
                                                    href="product.html"
                                                    className="product-image"
                                                >
                                                    <img
                                                        src="src/lib/assets/images/products/cart/product-2.jpg"
                                                        alt="product"
                                                    />
                                                </a>
                                                <a
                                                    href="/"
                                                    className="btn-remove"
                                                    title="Remove Product"
                                                >
                                                    <i className="icon-cancel" />
                                                </a>
                                            </figure>
                                        </div>
                                    </div>
                                    <div className="dropdown-cart-total">
                                        <span>Total</span>
                                        <span className="cart-total-price">
                                            $134.00
                                        </span>
                                    </div>
                                    <div className="dropdown-cart-action">
                                        <a
                                            href="checkout-shipping.html"
                                            className="btn btn-block"
                                        >
                                            Checkout
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DesktopMenu />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
