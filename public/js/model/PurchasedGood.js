//товар лежащий в корзине
import Good from './Good.js';
import eventEmmiter from '../helpers/eventEmmiter.js';

export default class PurchasedGood extends Good {
    constructor(goodData, quantity = 1) {
        //super({title: data.title, description: data.description, image: data.image, price: data._price});
        super(goodData);

        //this._id = goodData.id;
        this._quantity = quantity;
        this._eventEmmiter = eventEmmiter;
    }

    get price() { return this._price * this._quantity; }

    get quantity() { return this._quantity; }

    add() { return this._quantity++; }

    remove() { return this._quantity--; }
}
