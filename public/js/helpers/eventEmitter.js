export default {
    // Объект который, хранит обработчики событий
    _listeners: {},

    /**
     * Добавляет обработчик события
     * @param {string} type - тип события
     * @param {function} callback - функция-обработчик
     */
    addListener(type, callback) {
        if (typeof type !== 'string') {
            throw new Error('Event type must be a string');
        }

        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function');
        }

        if (this._listeners[type]) {
            this._listeners[type].push(callback);
        } else {
            this._listeners[type] = [callback];
        }

        console.log('listeners ', this._listeners);
    },

    /**
     * Вызывает все обработчики события
     * @param {string} type - тип события
     * @param {*} [params] - параметры для передачи в обработчики
     */
    emit(type, ...params) {
        this._listeners[type].forEach(callback => {
            if (typeof callback !== 'function') {
                throw new Error('callback is not a function');
            }
            callback(...params);
        });

        console.log('listeners ', this._listeners);
    },

    /**
     * Удаляет конкретный обработчик события
     * @param {string} type - тип события
     * @param {function} callback - функция-обработчик
     */
    removeListener(type, callback) {
        if (!this._listeners[type]) return;

        this._listeners[type] = this
            ._listeners[type]
            .filter(
                cb => cb !== callback
            );
    },

    /**
     * Подписывается на событие только один раз
     * @param {string} type - тип события
     * @param {function} callback - функция-обработчик
     */
    once(type, callback) {
        const onceCallback = (...args) => {
            callback(...args);
            this.removeListener(type, onceCallback);
        };

        this.addListener(type, onceCallback);
    },

    /**
     * Проверяет, есть ли обработчики для указанного события
     * @param {string} type - тип события
     * @returns {boolean}
     */
    has(type) {
        return !!this._listeners[type] && this._listeners[type].length > 0;
    },

    /**
     * Очищает все события и их обработчики
     */
    clear() {
        this._listeners = {};
    },

    /**
     * Возвращает список обработчиков для указанного события
     * @param {string} type - тип события
     * @returns {Array<function>}
     */
    getListeners(type) {
        return this._listeners[type] || [];
    }
}
