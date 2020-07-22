const hitCounts = {};

module.exports = {
    getHitCount(key) {
        return hitCounts[key] || 0;
    },

    incrementHitCount(key) {
        if (hitCounts[key]) hitCounts[key]++;
        else hitCounts[key] = 1;
    }
}