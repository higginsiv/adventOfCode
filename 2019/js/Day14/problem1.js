export default function solve({ lines, rawData }) {
    const ORE = 'ORE';
    const FUEL = 'FUEL';
    let keyToIngredients = new Map();
    let keyToNumberOutput = new Map();
    let ingredientsOnHand = new Map();
    let oreReliant = [];

    const data = lines.forEach((line) => {
        let [inputs, output] = line.split(' => ');

        output = output.split(' ');
        output[0] = parseInt(output[0]);

        inputs = inputs.split(', ').map((ingredient) => {
            ingredient = ingredient.split(' ');
            ingredient[0] = parseInt(ingredient[0]);
            if (ingredient[1] === ORE) {
                oreReliant.push(output[1]);
            }
            return ingredient;
        });

        keyToIngredients.set(output[1], inputs);
        keyToNumberOutput.set(output[1], output[0]);
    });

    function calculateOre(key, amount) {
        let onHand = ingredientsOnHand.get(key) ?? 0;
        if (onHand >= amount) {
            ingredientsOnHand.set(key, onHand - amount);
            return 0;
        } else {
            amount -= onHand;
            ingredientsOnHand.set(key, 0);
        }

        let ingredients = keyToIngredients.get(key);
        let numProduced = keyToNumberOutput.get(key);

        let mult = Math.ceil(amount / numProduced);
        let actualOutput = mult * numProduced;

        if (actualOutput > amount) {
            let currOnHand = ingredientsOnHand.get(key);
            currOnHand += actualOutput - amount;
            ingredientsOnHand.set(key, currOnHand);
        }

        if (ingredients[0][1] === ORE) {
            return ingredients[0][0] * mult;
        } else {
            return ingredients.reduce((total, curr) => {
                return total + calculateOre(curr[1], mult * curr[0]);
            }, 0);
        }
    }
    return { value: calculateOre(FUEL, 1) };
}
