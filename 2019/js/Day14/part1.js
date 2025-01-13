export default function solve({ lines, rawData }) {
    const { ceil } = Math;
    const ORE = 'ORE';
    const FUEL = 'FUEL';
    let keyToIngredients = new Map();
    let keyToNumberOutput = new Map();
    let ingredientsOnHand = new Map();

    lines.forEach((line) => {
        let [inputs, output] = line.split(' => ');

        output = output.split(' ');
        output[0] = parseInt(output[0]);
        output = { amount: output[0], key: output[1] };

        inputs = inputs.split(', ').map((ingredient) => {
            ingredient = ingredient.split(' ');
            ingredient[0] = parseInt(ingredient[0]);
            return { amount: ingredient[0], key: ingredient[1] };
        });

        keyToIngredients.set(output.key, inputs);
        keyToNumberOutput.set(output.key, output.amount);
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

        let mult = ceil(amount / numProduced);
        let actualOutput = mult * numProduced;

        if (actualOutput > amount) {
            let currOnHand = ingredientsOnHand.get(key);
            currOnHand += actualOutput - amount;
            ingredientsOnHand.set(key, currOnHand);
        }

        if (ingredients[0].key === ORE) {
            return ingredients[0].amount * mult;
        } else {
            return ingredients.reduce((total, curr) => {
                return total + calculateOre(curr.key, mult * curr.amount);
            }, 0);
        }
    }
    return { value: calculateOre(FUEL, 1) };
}
