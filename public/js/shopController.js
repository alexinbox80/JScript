import eventEmmiter from './helpers/eventEmmiter.js';
import Cart from './model/Cart.js';
import Showcase from './model/Showcase.js';

import PurchasedGood from './model/PurchasedGood.js';
import CardView from './view/CardView.js';
import CardBtnView from "./view/CardBtnView.js";

import CartView from "./view/CartView.js";

export default {
    _eventEmmiter: eventEmmiter,
    _showcaseModel: new Showcase,
    _cartModel: new Cart,

    init() {

        this._eventEmmiter.addListener('added', this._renderCart.bind(this));
        this._eventEmmiter.addListener('removed', this._renderCart.bind(this));
        this._eventEmmiter.addListener('loaded', this._renderCart.bind(this));
        this._eventEmmiter.addListener('loaded', this._renderShowcase.bind(this));

        this._eventEmmiter.addListener('loaded', this._renderPageCart.bind(this));

        this._cartModel.load();
        this._showcaseModel.load();

    },

    _addToCart(id) {

        const good = new PurchasedGood(this._showcaseModel.get(id));

        this._cartModel.add(good);
    },

    _removeFromCart(id) {
        this._cartModel.remove(id);
    },

    _renderCart() {
        const $header = document.querySelector('#header__cart');

        const $oldBtn = document.querySelector('.header__cart-count');

        if ($oldBtn) {

            $oldBtn.remove();

        }

        if ($header) {
            new CardBtnView(this._cartModel.getCount()).render($header, 'afterbegin');
        }

    },

    _renderPageCart() {
        const $cartList = document.querySelector('.cart__cards');

        if ($cartList) {

            $cartList.textContent = '';

            //console.log(this._cartModel);

            this._cartModel._goodList.forEach(
                good => {
                    //console.log(good);
                    const cart = new CartView(good);
                    cart.render($cartList, 'afterbegin');
                    //card.setAddHandler(this._addToCart.bind(this));
                }
            );

        }

    },

    _renderShowcase() {
        const $product = document.querySelector('.products__box');

        if ($product) {
            $product.textContent = '';


            this._showcaseModel.getAll().forEach(
                good => {
                    const card = new CardView(good);
                    card.render($product, 'beforeend');
                    card.setAddHandler(this._addToCart.bind(this));
                }
            );

        }
    }

}
