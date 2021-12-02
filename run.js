var hrMeasureAll = process.hrtime()
const utils = require('./utils')

let myArgs = process.argv.slice(2);
const hasTests = myArgs.includes('-t');

let results = [];

function runAll() {
    utils.range(25, 1).forEach(runSelected)
}

function runSelected(dayNumber) {
    try {
        var hrMeasureDay = process.hrtime()
        let result = require('./day' + dayNumber)({
            test: hasTests
        });
        const hrMeasureDayEnd = process.hrtime(hrMeasureDay)
        const resultObj = {
            "day": dayNumber,
            "Star1": result['s1'],
            "Star2": result['s2'],
            'Execution time': '%ss %msms'.split('%s').join(hrMeasureDayEnd[0]).split('%ms').join(hrMeasureDayEnd[1] / 1000000)
        }
        if (hasTests) {
            resultObj
            resultObj.test1 = result['test1'];
            resultObj.test2 = result['test2'];
        }

        results.push(resultObj);
    } catch (error) {
        if (error.name == 'Error') {
            console.warn("Day " + dayNumber + " not done yet, what are you waiting for?")
        } else {
            console.error(error.name, error);
        }
    }
}

if (myArgs.length > 0) {
    let daysArgs = myArgs.map(parseFloat).filter(Number);
    let info = 'Running' + ((daysArgs.length == 0) ? ' all' : ' '+ daysArgs.length) + ' days' ;
    if (daysArgs.length){
        info+= ': ' +daysArgs;
    }
    if(hasTests) {
        info += ' -- with tests';
    }
    console.log( info);
    if (daysArgs.length > 0) {
        daysArgs.forEach(runSelected);
    } else {
        runAll();
    }
} else {
    runAll();
}
console.table(results);
var hrMeasureAllEnd = process.hrtime(hrMeasureAll)
console.info('Whole execution time (hr): %ds %dms', hrMeasureAllEnd[0], hrMeasureAllEnd[1] / 1000000)