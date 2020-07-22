const shortStringService = require('./short-string/short-string-service');
const urlShorteningService = require('./url-shortning/url-shortening-service');
const analyticsService = require('./url-shortning/url-analytics-service');

const a = shortStringService.create();
const b = shortStringService.create();
const c = shortStringService.create();
const d = shortStringService.create();

// console.log(shortStringService.getAll())

// const d = shortStringService.getAndUpdate();
// shortStringService.getAndUpdate();
// shortStringService.getAndUpdate();
// shortStringService.getAndUpdate();

// console.log(d);

const shortUrl = urlShorteningService.getShortenedURL('longurl1.com', 1)
const shortUrl1 = urlShorteningService.getShortenedURL('longurl1.com', 1)
const shortUrl2 = urlShorteningService.getShortenedURL('https://www.google.com/search?q=something&rlz=1C5CHFA_enIN812IN812&oq=something&aqs=chrome..69i57.5508j0j7&sourceid=chrome&ie=UTF-8', 1)
const shortUrl3 = urlShorteningService.getShortenedURL('longurl1.com', 2)

// console.log(shortUrl, shortUrl1, shortUrl2, shortUrl3);
console.log(shortUrl2)
const longUrl1 = urlShorteningService.getOriginalURL(shortUrl2);
// urlShorteningService.getOriginalURL(shortUrl2)
// urlShorteningService.getOriginalURL(shortUrl2)
// urlShorteningService.getOriginalURL(shortUrl2)


console.log(longUrl1.url);

const count = analyticsService.getHitCount(shortUrl2)
const count1 = analyticsService.getHitCount(shortUrl3)

console.log(count, count1);
// console.log(shortStringService.getAll())
// console.log(urlShorteningService.getAll())