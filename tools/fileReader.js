const fs = require('fs');
const { EOL } = require('os');
module.exports = {
    getInput: function (
        year,
        dayNumber,
        delimiter = EOL,
        inputFile = 'input.txt'
    ) {
        return fs
            .readFileSync('./' + year + '/js/Day' + dayNumber + '/' + inputFile)
            .toString()
            .split(delimiter);
    },
    getInputForFunction: function (year, dayNumber, inputFile = 'input.txt') {
        const DATA = fs
            .readFileSync('./' + year + '/js/Day' + dayNumber + '/' + inputFile)
            .toString();
        return {
            lines: DATA.split(EOL),
            rawData: DATA,
        };
    },
};
