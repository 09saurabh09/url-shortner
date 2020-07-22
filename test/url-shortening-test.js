const assert = require('assert');
const urlShorteningService = require('../url-shortning/url-shortening-service');
const shortStringService = require('../short-string/short-string-service');
const analyticsService = require('../url-shortning/url-analytics-service');

describe('Url shortening service test', () => {
    beforeEach(() => {

    });

    it('should return shortened url', () => {
            shortStringService.create();
            const shortUrl = urlShorteningService.getShortenedURL('longurl1.com', 1);
            const [host, path] = shortUrl.split('/');
            assert.ok(path.length < 'longurl1.com'.length);
    });

    it('should return same url for same input if client are same', () => {
        shortStringService.create();
        shortStringService.create();
        shortStringService.create();
        const shortUrl1 = urlShorteningService.getShortenedURL('longurl1.com', 1);
        const shortUrl2 = urlShorteningService.getShortenedURL('longurl1.com', 1);
        assert.equal(shortUrl1, shortUrl2);
    });

    it('should return different url for same input if client are differet', () => {
        shortStringService.create();
        shortStringService.create();
        shortStringService.create();
        const shortUrl1 = urlShorteningService.getShortenedURL('longurl1.com', 1);
        const shortUrl2 = urlShorteningService.getShortenedURL('longurl1.com', 2);
        assert.notEqual(shortUrl1, shortUrl2);
    });

    it('should return correct usage statistics for any url', () => {
        shortStringService.create();
        shortStringService.create();
        shortStringService.create();
        const shortUrl1 = urlShorteningService.getShortenedURL('longurl1.com', 1);
        const times = Math.floor(Math.random() * 10) + 1;  
        for (let i = 0; i< times; i++) {
            urlShorteningService.getOriginalURL(shortUrl1);
        }
        const count = analyticsService.getHitCount(shortUrl1)
        assert.equal(times, count);
    });

    it('should return zero usage statistics for any url', () => {
        shortStringService.create();
        shortStringService.create();
        shortStringService.create();
        const shortUrl1 = urlShorteningService.getShortenedURL('longurl3.com', 1);
        const count = analyticsService.getHitCount(shortUrl1)
        assert.equal(0, count);
    });

    it('should not return same url twice for different input', () => {
        shortStringService.create();
        shortStringService.create();
        shortStringService.create();
        const shortUrl1 = urlShorteningService.getShortenedURL('longurl1.com', 1);
        const shortUrl2 = urlShorteningService.getShortenedURL('longurl2.com', 1);
        assert.notEqual(shortUrl1, shortUrl2);
    });
});