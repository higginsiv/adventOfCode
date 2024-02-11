module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const numRecipes = parseInt(rawData) + 10;
    let recipes = [3, 7];

    let elf1 = 0;
    let elf2 = 1;

    while (recipes.length < numRecipes) {
        const sum = recipes[elf1] + recipes[elf2];
        if (sum >= 10) {
            recipes.push(1);
            recipes.push(sum - 10);
        } else {
            recipes.push(sum);
        }

        elf1 = (elf1 + recipes[elf1] + 1) % recipes.length;
        elf2 = (elf2 + recipes[elf2] + 1) % recipes.length;
    }

    const answer = recipes.slice(numRecipes - 10, numRecipes).join('');
    return { value: answer };
}
