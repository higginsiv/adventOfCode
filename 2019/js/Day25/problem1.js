import readline from 'readline';
import { IntCode } from '../common/IntCode.js';

// Input Options
// north, east, south, west
// take <item>
// drop <item>
// inv

export default async function solve({ lines, rawData }) {
    const QUIT = 'q';

    let ic = new IntCode(rawData, null, 0, [], []);

    // TODO export memory after each step so that I can rapidly try all combinations at the door
    while (true) {
        let { output, pointer } = ic.run();
        console.log(output.map((x) => String.fromCharCode(x)).join(''));
        let input = await getInput();

        if (input === QUIT) {
            break;
        }

        ic.addAsciiInput([input]);
        ic.setState({ memory: ic.memory, pointer: pointer });
    }

    const answer = null;
    return { value: answer };
}

function getInput() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question('Enter input: ', (answer) => {
            resolve(answer);
            rl.close();
        });
    });
}

// NOTES
// BAD: giant electromagnet, infinite loop, photons, escape pod, molten lava
// GOOD: candy cane, prime number, mutex, dehydrated water, coin, manifold, fuel cell, cake
// Candy cane alone is too heavy
// Fuel Cell and Dehydrated Water are too heavy together. Dehydrated water is too light with all others

// WORKING: mutex, fuel cell, cake, coin
