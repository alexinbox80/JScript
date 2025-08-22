import eventEmitter from './helpers/eventEmitter.js';
import Cart from './model/Cart.js';
import ShowCase from './model/ShowCase.js';

import PurchasedGood from './model/PurchasedGood.js';
import CardView from './view/CardView.js';
import CardBtnView from './view/CardBtnView.js';

import CartView from './view/CartView.js';

export default {
    _eventEmitter: eventEmitter,
    _showCaseModel: new ShowCase,
    _cartModel: new Cart,

    init() {
        this._eventEmitter.addListener('added', this._renderCart.bind(this));
        this._eventEmitter.addListener('removed', this._renderCart.bind(this));

        this._eventEmitter.addListener('loaded', this._renderCart.bind(this));
        this._eventEmitter.addListener('loaded', this._renderShowCase.bind(this));
        this._eventEmitter.addListener('loaded', this._renderPageCart.bind(this));

        this._cartModel.load();
        this._showCaseModel.load();
    },

    _addToCart(id) {
        const good = new PurchasedGood(this._showCaseModel.get(id));
        console.log('good ', good);
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
            console.log('cart model ', this._cartModel);
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

    _renderShowCase() {
        const $product = document.querySelector('.products__box');

        if ($product) {
            $product.textContent = '';

            let count = 0;
            this._showCaseModel.getAll().forEach(
                good => {
                    if ( count < 6) {
                        const card = new CardView(good);
                        card.render($product, 'beforeend');
                        card.setAddHandler(this._addToCart.bind(this));
                    }
                    count++;
                }
            );
        }
    }
}
