export default class CardBtnView {
    constructor(goodCount) {
        this._data = goodCount;
      //  this._addHandlerCb = null;
    }

    getHtml() {
        return `<span class="header__cart-count">${this._data}</span>`;
    }

    render($container, target = 'afterbegin') {

        $container.insertAdjacentHTML(target, this.getHtml());
/*
        if (this._addHandler) {

            const addBtn = $container.querySelector(`#card-${this._data.id}`);

            addBtn.addEventListener('click', this._addHandler.bind(this));
        }*/
    }

 /*   _addHandler() {
        this._addHandlerCb(this._data.id);
    }

    setAddHandler(callback) {

        this._addHandlerCb = callback;

    }
*/
}
