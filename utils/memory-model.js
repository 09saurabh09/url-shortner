// class to implement memory store for entities
// All the objects will be stored in data[]

const sift = require('sift');
const {INVALID_INPUT, DUPLICATE_ENTRY} = require('./errors');
const { getRandomString } = require('./helper');

const data = {};
const cache = {};
class MemoryModel {
    constructor() {
        this.id = getRandomString();
    }
    static save(params) {
        if (!params.id) throw new Error(INVALID_INPUT);
        const instance = this.findById(params.id);
        if (instance) throw new Error(DUPLICATE_ENTRY);
        const identifier = this.getIdentifier();
        if (!data[identifier]) data[identifier] = [];
        data[identifier].push(params)
    }

    static getCacheKey(id) {
        const identifier = this.getIdentifier();
        return `${identifier}:${id}`;
    }

    static findById(id) {
        const identifier = this.getIdentifier();
        const cacheKey = this.getCacheKey(id);
        if (cache[cacheKey]) return cache[cacheKey];
        else {
            const instance = (data[identifier] || []).find(d => (d.id == id));
            if (instance) cache[cacheKey] = instance;
            return instance;
        } 
    }
    static find(condition = {}) {
        const identifier = this.getIdentifier();
        return (data[identifier] || []).filter(sift(condition))
    }

    static findOne(condition = {}) {
        const identifier = this.getIdentifier();
        return (data[identifier] || []).find(sift(condition))
    }

    static updateById(id, params) {
        const cacheKey = this.getCacheKey(id);
        const instance = this.findById(id);
        if (instance) {
            Object.keys(params).forEach(key => {
                instance[key] = params[key];
            });
            // update cache
            cache[cacheKey] = instance;
        }
        return instance;
    }
}

module.exports = MemoryModel;