import fs from 'fs';
import { EOL } from 'os';

export const getInput = (year, dayNumber, delimiter = EOL, inputFile = 'input.txt') => {
    return fs
        .readFileSync(`./${year}/js/Day${dayNumber}/${inputFile}`)
        .toString()
        .split(delimiter);
};

export const getInputForFunction = (year, dayNumber, inputFile = 'input.txt') => {
    const DATA = fs
        .readFileSync(`./${year}/js/Day${dayNumber}/${inputFile}`)
        .toString();
    return {
        lines: DATA.split(EOL),
        rawData: DATA,
    };
};
