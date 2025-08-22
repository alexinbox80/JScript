import GoodList from './GoodList.js';
import dataHandler from '../helpers/dataHandler.js'
import Good from './Good.js';

export default class ShowCase extends GoodList {
    constructor() {
        super();
    }

    load() {
        return super.load(dataHandler.getCatalog.bind(dataHandler), Good);
    }
}
