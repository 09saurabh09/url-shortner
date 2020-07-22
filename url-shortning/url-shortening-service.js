const Store = require('./url-store');
const shortStringService = require('../short-string/short-string-service');
const analyticsService = require('./url-analytics-service');

const { getHost } = require('../utils/config');
module.exports = {
    getShortenedURL(longUrl, clientId) {
        const urlObject = Store.findOne({ originalUrl: longUrl, clientId });
        if (urlObject) return `${getHost()}/${urlObject.shortUrl}`;
        const shortString = shortStringService.getAndUpdate();       
        const params = {
            originalUrl: longUrl,
            clientId,
            shortUrl: shortString
        };
        const application = new Store(params);
        Store.save(application);
        return `${getHost()}/${shortString}`;
    },
    getOriginalURL(shortUrl) {
        const [host, path] = shortUrl.split('/');
        const urlObject = Store.findOne({ shortUrl: path });
        if (!urlObject) throw new Error('Url not found');
        // Store.updateById(urlObject.id, { hits: urlObject.hits });
        analyticsService.incrementHitCount(shortUrl);
        if (urlObject) return {
            url: urlObject.originalUrl,
            code: 307
        }
    },
    get(id) {
        return Store.findById(id);
    },
    update(id, params) {
        return Store.updateById(id, params);
    },
    getAll() {
        return Store.find();
    }
}