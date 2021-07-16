export default {
    _url: '/Lesson05/api/v1/',

    getCatalog(errorCallBack) {
        return fetch(`${this._url}catalogData.json`)
            .then((response) => {
                if (response.ok) {
                    //return response.data;

                    return response.json();
                } else {
                    return errorCallBack(response.status);
                }
            })
            .then((data) => data)
            .catch((error) => {
                return errorCallBack(error);
            })
    },

    getCart(errorCallBack) {
        return fetch(`${this._url}getCart.json`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return errorCallBack(response.status);
                }
            })
            .then((data) => data)
            .catch((error) => {
                return errorCallBack(error);
            })
    },

    addToCart(errorCallBack, data) {
        return fetch(`${this._url}addToCart`, {
            method: 'POST',
            body: data
        })
            .then((response) => {
                if (response.ok) {
                    return true;
                } else {
                    return errorCallBack(response.status);
                }
            })
            .catch((error) => {
                return errorCallBack(error);
            })
    },

    deleteFromCart(errorCallBack, id) {
        return fetch(`${this._url}deleteFromCart`, {
            method: 'DELETE',
            body: {id: id}
        })
            .then((response) => {
                if (response.ok) {
                    return true;
                } else {
                    return errorCallBack(response.status);
                }
            })
            .catch((error) => {
                return errorCallBack(error);
            })
    }
}
