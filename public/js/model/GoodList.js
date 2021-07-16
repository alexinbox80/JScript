import eventEmmiter from '../helpers/eventEmmiter.js';


export default class GoodList {

    constructor() {
        this._goodList = [];
        this._eventEmmiter = eventEmmiter;
    }

    load(callback, goodClass){

        callback().then(data => {

            this._goodList = data.map(item => new  goodClass(item));

            this._eventEmmiter.emit('loaded');

        });

    }

    add(good) {

        this._goodList.push(good);
    }

    remove(id) {
        this._goodList.filter(good => good.id !== id);
    }

    get(id) {
        return this._goodList.find(good => good.id == id);
    }

    getAll() {
        return this._goodList;
    }

    getById(id) {
        return this.goods.find(good => good.id === id);
    }

    getSumGoodsList() {

        const sumGoodsList = this.goods.reduce((acc, num) => acc + num.price, 0);

        return sumGoodsList;
    }

}
