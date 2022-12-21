const fr = require("../../../tools/fileReader");
const [year, day, part] = ["2022", "21", "2"];
const HUMAN = "humn";
const ROOT = "root";
const NUMBER = "number";
const [ADD, SUB, MULT, DIV] = ["+", "-", "*", "/"];

class Command {
  key;
  param1;
  param2;
  operator;
  isNum;
  // inverseOp;
  // func;
  constructor(key, param1, param2, operator) {
    this.key = key;
    this.param1 = param1;
    this.param2 = param2;
    this.operator = operator;
    this.isNum = param2 == null;
    // this.inverseOp = operator === '+' ? '-' : operator === '-' ? '+' : operator === '*' ? '/' : '*';
  }
}
const data = fr.getInput(year, day).map((y) => {
  let parts = y.split(": ");
  let cmd = parts[1].split(" ");

  if (cmd.length === 1) {
    y = new Command(parts[0], parseInt(parts[1]));
  } else {
    let operator = parts[0] === ROOT ? "===" : cmd[1];
    y = new Command(parts[0], cmd[0], cmd[2], operator);
  }
  return y;
});
// console.log(data)

let commands = new Map();
data.forEach((x) => {
  if (x.isNum == undefined) {
    console.log(x);
  }
  commands.set(x.key, x);
});

// "new Function" syntax results in functions that only have access to global scope
global.calc = function calc(key) {
  let cmd = commands.get(key);
    let closeEnough;
  if (key === ROOT) {
    const val1 = calc(cmd.param1);
    const val2 = calc(cmd.param2);

    if (typeof val1 !== NUMBER) {
        closeEnough = operate(val1, val2);
      return loop(val1, val2, closeEnough);
    } else if (typeof val2 !== NUMBER) {
        closeEnough = operate(val2, val1);
      return loop(val2, val1, closeEnough);
    } else {
      console.log("panic");
    }
  } else {
    if (!cmd.isNum) {
      const val1 = calc(cmd.param1);
      const val2 = calc(cmd.param2);

      if (typeof val1 === NUMBER && typeof val2 === NUMBER) {
        return new Function(
          "return " + val1 + " " + cmd.operator + " " + val2
        )();
      } else {
        return "(" + val1 + " " + cmd.operator + " " + val2 + ")";
      }
    } else {
      if (cmd.key === HUMAN) {
        return HUMAN;
      }

      return cmd.param1;
    }
  }
};

function operate(equation, goalNumber) {
    console.log(goalNumber);
  while (true) {
    equation = equation.substring(1, equation.length - 1);
    console.log(goalNumber)
    console.log(equation)
    let num;
    let operator;
    if (!equation.startsWith("(") && !equation.startsWith(HUMAN)) {
      let locOfFirstSpace = equation.indexOf(" ");
      let locOfSecondSpace = equation.indexOf(" ", locOfFirstSpace + 1);
      num = parseInt(equation.substring(0, locOfFirstSpace));
      operator = getOppositeOperator(
        equation.substring(locOfFirstSpace + 1, locOfSecondSpace)
      );
      equation = equation.substring(locOfSecondSpace + 1);

      goalNumber = Math.floor(new Function(
        "return " + goalNumber + " " + operator + " " + num
      )());
    } else if (equation.startsWith("(") && !equation.endsWith(HUMAN)) {
      let locOfFirstSpace = equation.lastIndexOf(" ");
      let locOfSecondSpace = equation.lastIndexOf(" ", locOfFirstSpace - 1);
      num = parseInt(equation.substring(locOfFirstSpace));
      operator = getOppositeOperator(
        equation.substring(locOfSecondSpace + 1, locOfFirstSpace)
      );
      equation = equation.substring(0, locOfSecondSpace);

      goalNumber = Math.floor(new Function(
        "return " + goalNumber + " " + operator + " " + num
      )());
    } else if (equation.startsWith(HUMAN)) {
        let locOfFirstSpace = equation.indexOf(" ");
        let locOfSecondSpace = equation.indexOf(" ", locOfFirstSpace + 1);
        num = parseInt(equation.substring(locOfSecondSpace));
        operator = getOppositeOperator(
            equation.substring(locOfFirstSpace + 1, locOfSecondSpace)
          );
          goalNumber = Math.floor(new Function(
            "return " + goalNumber + " " + operator + " " + num
          )());
      break;
    } else if (equation.endsWith(HUMAN)) {
        let locOfFirstSpace = equation.indexOf(" ");
        let locOfSecondSpace = equation.indexOf(" ", locOfFirstSpace + 1);
        num = parseInt(equation.substring(0, locOfFirstSpace));
        operator = getOppositeOperator(
            equation.substring(locOfFirstSpace + 1, locOfSecondSpace)
          );
        goalNumber = Math.floor(new Function(
            "return " + goalNumber + " " + operator + " " + num
          )());
      break;
    }
  }
  return goalNumber;
}

function getOppositeOperator(operator) {
  switch (operator) {
    case ADD:
      return SUB;
    case SUB:
      return ADD;
    case MULT:
      return DIV;
    case DIV:
      return MULT;
  }
}

function loop(testString, goalNumber, closeEnough) {
  let result;
  let i = closeEnough - 1000000;
  let logIt = true;
  while (goalNumber != result) {
    i++;
    result = new Function("return " + testString.replace(HUMAN, i))();
    if (i % 100000 === 0) {
      console.log(i);
    }
    if (i > closeEnough && logIt) {
        logIt = false;
        console.log('GREATEST')
    }
  }
  return i;
}

let answer = calc(ROOT);

console.log("Year " + year + " Day " + day + " Puzzle " + part + ": " + answer);

// HUMAN
// HUMAN + 888
// 888 + HUMAN

// x === (4 + (1 + 2)) * ( 5 + human)
