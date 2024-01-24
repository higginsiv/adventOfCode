console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2015', '08', '2'];

let originalChars = 0;
let encodedChars = 0;

fr.getInput(year, day).forEach((curr) => {
    originalChars += curr.length;

    let encoded = ['"'];
    curr.split('').forEach((char) => {
        if (char == '"' || char == '\\') {
            encoded.push('\\');
        }
        encoded.push(char);
    });
    encoded.push('"');
    encodedChars += encoded.length;
});

const answer = encodedChars - originalChars;
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
