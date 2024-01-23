module.exports = { solve: solve };

// Assembunny had a bug. Decided to parse the input manually to learn what was happening.
// The following explanation has values in parentheses that correspond to my input. The overall idea
// is to take a value, print out if it is even or odd, half it, and repeat. When the value reaches 0, start over.
// Step 1: A value is generated that is the sum of "a" (the answer) and "c" (4) * "b" (633) and stored into "a"
//      cpy a d
//      cpy 4 c
//      cpy 633 b
//      inc d
//      dec b
//      jnz b -2
//      dec c
//      jnz c -5
//      cpy d a
//      jnz 0 0
// Step 2: "a" is copied to "b" and "b" is divided by 2. The quotient is stored in "a" and the "c" is left as 2 if "b" was even and 1 if "b" was odd
//      cpy a b
//      cpy 0 a
//      cpy 2 c
//      jnz b 2
//      jnz 1 6
//      dec b
//      dec c
//      jnz c -4
//      inc a
//      jnz 1 -7
// Step 3: If "c" is 2, "b" is set to 0. Otherwise, "b" is set to 1
//      cpy 2 b
//      jnz c 2
//      jnz 1 4
//      dec b
//      dec c
//      jnz 1 -4
//      jnz 0 0
// Step 4: "b" is outputted. Loop back to step 2. "a" will now be half of the previous "a" value
//      out b
//      jnz a -19
// Step 5: Once "a" reaches 0, loop back to step 1. "a" will be reset to the "d" value. This keeps the loop infinite

function solve({ lines, rawData }) {
    const answerFloor = Number(lines[2].split(' ')[1]) * Number(lines[1].split(' ')[1]);
    const answerFloorBinary = answerFloor.toString(2);

    let firstGreaterThanFloorBinary = '';
    while (firstGreaterThanFloorBinary.length < answerFloorBinary.length) {
        firstGreaterThanFloorBinary += '10';
    }

    const answer = parseInt(firstGreaterThanFloorBinary, 2) - answerFloor;
    return { value: answer };
}
