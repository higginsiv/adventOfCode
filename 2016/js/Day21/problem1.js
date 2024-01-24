module.exports = { solve: solve };

function solve({ lines, rawData }) {
  let password = 'abcdefgh'.split('');

  function rotateRight(arr, n) {
    return arr.slice(-n).concat(arr.slice(0, -n));
  }

  lines
    .map((line) => line.split(' '))
    .forEach((line) => {
      switch (line[0]) {
        case 'swap':
          if (line[1] === 'position') {
            let x = parseInt(line[2]);
            let y = parseInt(line[5]);
            let temp = password[x];
            password[x] = password[y];
            password[y] = temp;
          } else {
            let x = line[2];
            let y = line[5];
            password = password.map((char) => {
              return char === x ? y : char === y ? x : char;
            });
          }
          break;
        case 'rotate':
          if (line[1] === 'left') {
            password = password
              .slice(parseInt(line[2]))
              .concat(password.slice(0, parseInt(line[2])));
          } else if (line[1] === 'right') {
            password = rotateRight(password, parseInt(line[2]));
          } else {
            let index = password.indexOf(line[6]);
            if (index >= 4) {
              index++;
            }
            password = rotateRight(password, index + 1);
          }
          break;
        case 'reverse':
          let x = parseInt(line[2]);
          let y = parseInt(line[4]);
          let temp = password.slice(x, y + 1).reverse();
          password = password
            .slice(0, x)
            .concat(temp)
            .concat(password.slice(y + 1));
          break;
        case 'move':
          let xIndex = parseInt(line[2]);
          let yIndex = parseInt(line[5]);
          let char = password[xIndex];
          password.splice(xIndex, 1);
          password.splice(yIndex, 0, char);
          break;
      }
    });

  let answer = password.join('');
  return { value: answer };
}
