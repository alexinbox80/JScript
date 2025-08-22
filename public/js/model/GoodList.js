import eventEmitter from '../helpers/eventEmitter.js';


export default class GoodList {

    constructor() {
        this._goodList = [];
        this._eventEmitter = eventEmitter;
    }

    load(callback, goodClass){
        callback().then(data => {
            this._goodList = data.map(item => new  goodClass(item));

            console.log('good list ', this._goodList);

            this._eventEmitter.emit('loaded');
        });
    }

    add(good) {
        this._goodList.push(good);
    }

    remove(id) {
        this._goodList.filter(good => good.id !== id);
    }

    get(id) {
        return this._goodList.find(good => good.id === id);
    }

    getAll() {
        return this._goodList;
    }

    getById(id) {
        return this._goodList.find(good => good.id === id);
    }

    getSumGoodsList() {
        return this._goodList.reduce((acc, num) => acc + num.price, 0);
    }
}
