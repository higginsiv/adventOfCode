module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const recipeSequence = rawData.split('').map(Number);

    let recipes = [3, 7];

    let elf1 = 0;
    let elf2 = 1;

    let spotInSequence = 0;

    while (spotInSequence < recipeSequence.length) {
        const sum = recipes[elf1] + recipes[elf2];
        const toPush = [];
        if (sum >= 10) {
            toPush.push(1);
            toPush.push(sum - 10);
        } else {
            toPush.push(sum);
        }

        for (let i = 0; i < toPush.length; i++) {
            recipes.push(toPush[i]);
            if (toPush[i] === recipeSequence[spotInSequence]) {
                spotInSequence++;
                if (spotInSequence === recipeSequence.length) {
                    break;
                }
            } else {
                spotInSequence = 0;
            }
        }

        elf1 = (elf1 + recipes[elf1] + 1) % recipes.length;
        elf2 = (elf2 + recipes[elf2] + 1) % recipes.length;
    }

    const answer = recipes.length - recipeSequence.length;
    return { value: answer };
}
