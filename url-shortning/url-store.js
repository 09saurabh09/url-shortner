const MemoryModel = require('../utils/memory-model');
class UrlStore extends MemoryModel {
    constructor(params) {
        const { originalUrl, shortUrl, clientId } = params
        super(params);
        this.originalUrl = originalUrl;
        this.shortUrl = shortUrl;
        this.hits = 0;
        this.clientId = clientId;
    }

    static getIdentifier() {
        return 'url-store';
    }
};

module.exports = UrlStore;