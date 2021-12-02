const utils = require('../utils');
var cleanList = utils.readInput(__dirname + '/input.txt').split('\n').filter(item => item).map(Number),
    testList = [
        199,
        200,
        208,
        210,
        200,
        207,
        240,
        269,
        260,
        263
    ];

const firstReducer = function (list) {
    return list.reduce((acc, current, index, array) => {
        if (index > 0) {
            if (array[index - 1] < current) {
                return acc + 1;
            } else {
                return acc;
            }
        } else {
            return 0;
        }
    }, 0) // 0 is to force acc to start at 0 instead of first array value.
}

function star1(list) {
    return firstReducer(list);
}

function star2(list) {
    const sumOfThree = list.map(
        (current, index, array) => {
            [current, array[index + 1], array[index + 2]].reduce((a, b) => a + b) // Group elements by sets of 3 and compute the sum of their values
        }
    ).filter((x) => !isNaN(x)) // remove any NaN value from the array
    return firstReducer(sumOfThree);
}

module.exports = function (options) {
    let ret = {
        "s1": star1(cleanList),
        "s2": star2(cleanList)
    }
    if (typeof options.test != 'undefined' && options.test) {
        ret.test1 = star1(testList);
        ret.test2 = star2(testList);
    }
    return ret;
}