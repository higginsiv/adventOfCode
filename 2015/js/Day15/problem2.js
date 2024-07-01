export default function solve({ lines, rawData }) {
    const MAX = 100;
    const CALORIE_GOAL = 500;
    let ingredients = [];
    lines.forEach((x) => {
        x = x.replace(',', '');
        x = x.split(' ');
        let ingredient = {};
        ingredient[x[1]] = parseInt(x[2]);
        ingredient[x[3]] = parseInt(x[4]);
        ingredient[x[5]] = parseInt(x[6]);
        ingredient[x[7]] = parseInt(x[8]);
        ingredient[x[9]] = parseInt(x[10]);

        ingredients.push(ingredient);
    });

    let best = -Infinity;
    for (let i = 0; i <= MAX; i++) {
        for (let j = 0; j + i <= 100; j++) {
            for (let k = 0; j + i + k <= 100; k++) {
                let l = 100 - j - i - k;

                let calories =
                    i * ingredients[0].calories +
                    j * ingredients[1].calories +
                    k * ingredients[2].calories +
                    l * ingredients[3].calories;

                if (calories != CALORIE_GOAL) {
                    continue;
                }

                let capacity =
                    i * ingredients[0].capacity +
                    j * ingredients[1].capacity +
                    k * ingredients[2].capacity +
                    l * ingredients[3].capacity;
                let durability =
                    i * ingredients[0].durability +
                    j * ingredients[1].durability +
                    k * ingredients[2].durability +
                    l * ingredients[3].durability;
                let flavor =
                    i * ingredients[0].flavor +
                    j * ingredients[1].flavor +
                    k * ingredients[2].flavor +
                    l * ingredients[3].flavor;
                let texture =
                    i * ingredients[0].texture +
                    j * ingredients[1].texture +
                    k * ingredients[2].texture +
                    l * ingredients[3].texture;

                capacity = Math.max(0, capacity);
                durability = Math.max(0, durability);
                flavor = Math.max(0, flavor);
                texture = Math.max(0, texture);

                let score = capacity * durability * flavor * texture;
                if (score > best) {
                    best = score;
                }
            }
        }
    }
    return { value: best };
}
