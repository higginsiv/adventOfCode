console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2015', '11', '1'];
const [A, Z, I, O, L] = [
  'a'.charCodeAt(0),
  'z'.charCodeAt(0),
  'i'.charCodeAt(0),
  'o'.charCodeAt(0),
  'l'.charCodeAt(0),
];

let password = fr.getInput(year, day)[0].split('');

do {
  password = increment(password);
} while (!isValid(password));

function increment(password) {
  let index = password.length - 1;
  let doneIncrementing = false;

  while (!doneIncrementing) {
    if (password[index] == 'z') {
      password[index] = 'a';
      if (index == 0) {
        password.unshift('a');
        doneIncrementing = true;
      } else {
        index--;
      }
    } else {
      let newCharCode = password[index].charCodeAt(0) + 1;
      if (newCharCode == I || newCharCode == O || newCharCode == L) {
        newCharCode++;
      }
      password[index] = String.fromCharCode(newCharCode);
      doneIncrementing = true;
    }
  }

  return password;
}

function isValid(password) {
  let passString = password.join('');
  let matches = passString.match(/([a-z])\1{1}/g);
  if (matches == null || matches.length < 2) {
    return false;
  }

  let hasSequence = false;
  for (let i = 0; i < password.length - 2; i++) {
    if (
      password[i].charCodeAt(0) + 1 == password[i + 1].charCodeAt(0) &&
      password[i].charCodeAt(0) + 2 == password[i + 2].charCodeAt(0)
    ) {
      hasSequence = true;
      break;
    }
  }
  return hasSequence;
}

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + password.join(''));
console.timeEnd();
