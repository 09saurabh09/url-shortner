const Store = require('./short-string-store');
const { getRandomString } = require('../utils/helper');
module.exports = {
    create() {
        const params = {
            value: getRandomString()
        };
        const application = new Store(params);
        Store.save(application);
        return application;
    },
    get(id) {
        return Store.findById(id);
    },
    update(id, params) {
        return Store.updateById(id, params);
    },
    getAll() {
        return Store.find();
    },
    getAndUpdate() {
        const urlObject = Store.findOne({ status: 'available' });
        if (!urlObject) throw new Error('No url available');
        return Store.updateById(urlObject.id, { status: 'reserved' }).value;
    },
    getActiveApplicationForUser(userId) {
        return Store.find({ user: userId, state: 'active' });
    }
}