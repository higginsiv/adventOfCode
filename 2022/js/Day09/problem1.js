const fr = require("../../../tools/fileReader");
const [year, day, part] = ["2022", "09", "1"];
const data = fr
  .getInput(year, day)
  .map((x) => x.split(" ").map((y, index) => (index === 0 ? y : parseInt(y))));

let head = {
  x: 0,
  y: 0,
};
let tail = {
  x: 0,
  y: 0,
};

let tailVisits = new Set(["0.0"]);

data.forEach(([dir, amount]) => {
  switch (dir) {
    case "U":
      move("y", amount);
      break;
    case "D":
      move("y", -amount);
      break;
    case "L":
      move("x", -amount);
      break;
    case "R":
      move("x", amount);
      break;
  }
});

function move(axis, delta) {
  const increment = delta > 0 ? 1 : -1;
  for (let i = 0; i < Math.abs(delta); i++) {
    head[axis] += increment;
    if (!isTouching()) {
      tail[axis] += increment;
      tail[oppositeAxis(axis)] = head[oppositeAxis(axis)];
      tailVisits.add(tail["x"].toString() + "." + tail["y"].toString());
    }
  }
}

function isTouching() {
  return Math.abs(head.x - tail.x) <= 1 && Math.abs(head.y - tail.y) <= 1;
}

function oppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}

console.log(
  "Year " + year + " Day " + day + " Puzzle " + part + ": " + tailVisits.size
);
