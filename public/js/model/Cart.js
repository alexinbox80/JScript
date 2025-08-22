import GoodList from './GoodList.js';
import dataHandler from '../helpers/dataHandler.js'
import PurchasedGood from './PurchasedGood.js';

export default class Cart extends GoodList {
    constructor() {
        super();
    }

    load() {
        super.load(dataHandler.getCart.bind(dataHandler), PurchasedGood);
    }

    add(good) {
        const findGood = this._goodList.find(item => item.id === good.id);

        if (findGood) {
            findGood.add();
        } else {
            super.add(good);
        }

        this._eventEmitter.emit('added', good.id);

        console.log('good list ', this._goodList);
        console.log('event emitter ', this._eventEmitter);
    }

    decrease(id) {
        const findGood = this._goodList.filter(item => item.id === id);

        if(findGood.quantity > 1) {
            findGood.remove();
        } else {
            super.remove(id);
        }
        this._eventEmitter.emit('removed', id);
    }

    getCount() {
        return this._goodList.reduce((acc, good) => acc + good.quantity, 0);
    }
}
