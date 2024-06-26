export default function solve({ lines, rawData }) {
    const OUTPUT_PART_1 = 3176;

    let gates = new Map();

    lines
        .map((x) => x.split(' -> '))
        .forEach((x) => {
            gates.set(x[1], x[0]);
        });

    gates.set('b', OUTPUT_PART_1);

    function traverse(key) {
        let input = gates.get(key);

        // Key is a number
        if (input == null) {
            return key;
        }

        // Signal input to key was a number
        if (!isNaN(input)) {
            return input;
        }

        input = input.split(' ');

        let retValue;
        if (input.length == 1) {
            retValue = traverse(input[0]);
        } else if (input.length == 2) {
            retValue = ~traverse(input[1]);
        } else if (input[1] == 'AND') {
            retValue = traverse(input[0]) & traverse(input[2]);
        } else if (input[1] == 'OR') {
            retValue = traverse(input[0]) | traverse(input[2]);
        } else if (input[1] == 'LSHIFT') {
            retValue = traverse(input[0]) << traverse(input[2]);
        } else if (input[1] == 'RSHIFT') {
            retValue = traverse(input[0]) >> traverse(input[2]);
        } else {
            console.log('error parsing instruction: ' + input);
        }

        gates.set(key, retValue);
        return retValue;
    }

    let answer = traverse('a');
    if (answer < 0) {
        answer += 65536;
    }

    return { value: answer };
}
