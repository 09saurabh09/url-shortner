const shortid = require('shortid');

module.exports = {
    getRandomString() {
        return shortid.generate();
    }
}