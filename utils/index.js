var fs = require('fs')

// get input
exports.readInput = function(path) {
    return fs.readFileSync(path, 'utf-8');
}
exports.range = function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}