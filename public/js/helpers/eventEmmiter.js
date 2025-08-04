export default {
    // Объект который хранит обработчики событий
    _listeners: {},
    // функция которая добавлыет обработчики события в массив
    addListener(type, callback) {
        if(this._listeners[type]) {
            this._listeners[type].push(callback);
        } else {
            this._listeners[type] = [callback];
        }
    },
    //
    emit(type, ...params) {
        this._listeners[type].forEach(callback => {callback(params)});
    }
}