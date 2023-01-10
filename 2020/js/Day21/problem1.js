console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ["2020","21","1"];

let allIngredients = [];
let allergenToPossible = new Map();

const data = fr.getInput(year,day).forEach(line => {
    line = line.replace(')','');
    line = line.split(' (contains ');
    let ingredients = line[0].split(' ');
    let allergens = line[1].split(', ');

    allIngredients = allIngredients.concat(ingredients);

    allergens.forEach(allergen => {
        if (allergenToPossible.get(allergen) == null) {
            allergenToPossible.set(allergen, new Set(ingredients))
        } else {
            let possible = allergenToPossible.get(allergen);
            possible.forEach(poss => {
                if (!ingredients.includes(poss)) {
                    possible.delete(poss);
                }
            })
        }
    })
});

let allPossibleIngredientAllergens = Array.from(allergenToPossible.values()).reduce((total, curr) => {
    return new Set([...total, ...curr])
}, new Set());

let answer = 0;

allIngredients.forEach(ingredient => {
    if (!allPossibleIngredientAllergens.has(ingredient)) {
        answer++;
    }
});

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();