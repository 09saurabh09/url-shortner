const MemoryModel = require('../utils/memory-model');
class UrlStore extends MemoryModel {
    constructor(params) {
        super(params);
        const { value } = params;
        this.value = value;
        this.status = 'available';
    }

    static getIdentifier() {
        return 'short-string';
    }
};

module.exports = UrlStore;