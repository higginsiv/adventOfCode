console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ["2020","21","2"];

let allIngredients = [];
let allAllergens = new Set();
let allergenToPossible = new Map();

const data = fr.getInput(year,day).forEach(line => {
    line = line.replace(')','');
    line = line.split(' (contains ');
    let ingredients = line[0].split(' ');
    let allergens = line[1].split(', ');

    allIngredients = allIngredients.concat(ingredients);
    allAllergens = new Set([...allAllergens, ...allergens]);

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

let answer = [];
let allergens = [...allAllergens];
allergens.sort();

let cont = true;
while (cont) {
    cont = false;
    allergens.forEach(allergen => {
        let possible = allergenToPossible.get(allergen);
        if (possible.size === 1) {
            let toDel = [...possible][0];
            allergens.forEach(a => {
                let p = allergenToPossible.get(a)
                if (p.size !== 1) {
                    cont = true;
                    p.delete(toDel);
                }
            })
        }
    })
}

allergens.forEach(allergen => {
    answer.push([...allergenToPossible.get(allergen)][0]);
});

answer = answer.join();

console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();