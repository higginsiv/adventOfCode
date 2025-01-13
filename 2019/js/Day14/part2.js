export default function solve({ lines, rawData }) {
    const { ceil } = Math;
    const ORE = 'ORE';
    const FUEL = 'FUEL';
    let oreAvailable = 1000000000000;
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

    function calculateOre(key, amountToMake) {
        // Check if we have enough of the ingredient already made
        let onHand = ingredientsOnHand.get(key) ?? 0;
        if (onHand >= amountToMake) {
            ingredientsOnHand.set(key, onHand - amountToMake);
            return 0;
        } else {
            amountToMake -= onHand;
            ingredientsOnHand.set(key, 0);
        }

        let ingredients = keyToIngredients.get(key);
        let numProducedByRecipe = keyToNumberOutput.get(key);

        let recipeIterationsNeeded = ceil(amountToMake / numProducedByRecipe);
        let actualOutput = recipeIterationsNeeded * numProducedByRecipe;

        if (actualOutput > amountToMake) {
            let currOnHand = ingredientsOnHand.get(key);
            currOnHand += actualOutput - amountToMake;
            ingredientsOnHand.set(key, currOnHand);
        }

        if (ingredients[0].key === ORE) {
            return ingredients[0].amount * recipeIterationsNeeded;
        } else {
            return ingredients.reduce((total, curr) => {
                return total + calculateOre(curr.key, recipeIterationsNeeded * curr.amount);
            }, 0);
        }
    }

    let fuel = 0;
    let fuelIncrement = 10000;
    while (oreAvailable > 0) {
        const tempOnHand = new Map(ingredientsOnHand);
        const oreRequired = calculateOre(FUEL, fuelIncrement);
        if (oreRequired <= oreAvailable) {
            fuel += fuelIncrement;
            oreAvailable -= oreRequired;
        } else {
            fuelIncrement = Math.floor(fuelIncrement / 2);
            if (fuelIncrement === 0) {
                break;
            }
            ingredientsOnHand = tempOnHand;
            continue;
        }
    }

    return { value: fuel };
}
