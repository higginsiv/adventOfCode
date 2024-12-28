export default function solve({ lines, rawData }) {
    function push(value) {
        recipes.push(value);
        if (value === recipeSequence[spotInSequence]) {
            spotInSequence++;
            if (spotInSequence === recipeSequence.length) {
                return true;
            }
        } else {
            spotInSequence = 0;
        }
        return false;
    }

    const recipeSequence = rawData.split('').map(Number);

    let recipes = [3, 7];

    let elf1 = 0;
    let elf2 = 1;

    let spotInSequence = 0;

    while (spotInSequence < recipeSequence.length) {
        const sum = recipes[elf1] + recipes[elf2];
        const toPush = [];
        let finished = false;
        if (sum >= 10) {
            finished = push(1);
            if (finished) {
                break;
            }
            finished = push(sum - 10);
        } else {
            finished = push(sum);
        }

        elf1 = (elf1 + recipes[elf1] + 1) % recipes.length;
        elf2 = (elf2 + recipes[elf2] + 1) % recipes.length;
    }

    const answer = recipes.length - recipeSequence.length;
    return { value: answer };
}
