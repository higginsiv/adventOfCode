export default function solve({ lines, rawData }) {
    let allIngredients = [];
    let allergenToPossible = new Map();

    lines.forEach((line) => {
        line = line.replace(')', '');
        line = line.split(' (contains ');
        let ingredients = line[0].split(' ');
        let allergens = line[1].split(', ');

        allIngredients = allIngredients.concat(ingredients);

        allergens.forEach((allergen) => {
            if (allergenToPossible.get(allergen) == null) {
                allergenToPossible.set(allergen, new Set(ingredients));
            } else {
                let possible = allergenToPossible.get(allergen);
                possible.forEach((poss) => {
                    if (!ingredients.includes(poss)) {
                        possible.delete(poss);
                    }
                });
            }
        });
    });

    let allPossibleIngredientAllergens = Array.from(allergenToPossible.values()).reduce(
        (total, curr) => {
            return new Set([...total, ...curr]);
        },
        new Set(),
    );

    let answer = 0;

    allIngredients.forEach((ingredient) => {
        if (!allPossibleIngredientAllergens.has(ingredient)) {
            answer++;
        }
    });
    return { value: answer };
}
