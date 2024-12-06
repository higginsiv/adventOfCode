import { permute } from '#tools/math.js';

export default function solve({ lines, rawData }) {
    let people = new Map();
    lines.forEach((x) => {
        x = x.replace(' would ', ' ');
        x = x.replace(' happiness units by sitting next to ', ' ');
        x = x.replace('.', '');

        const [NAME, DIRECTION, NUMBER, GUEST] = x.split(' ');

        let person = people.get(NAME);
        if (person == null) {
            person = new Map();
            people.set(NAME, person);
        }

        person.set(GUEST, DIRECTION == 'gain' ? parseInt(NUMBER) : -parseInt(NUMBER));
    });

    people.set('Willy', new Map());

    let perms = permute([...people.keys()]);

    let answer = perms.reduce((total, curr, index) => {
        let happiness = 0;
        for (let i = 0; i < curr.length; i++) {
            let partnerAIndex = i - 1 < 0 ? curr.length - 1 : i - 1;
            let partnerBIndex = i + 1 >= curr.length ? 0 : i + 1;

            let partnerAHappiness =
                people.get(curr[i]).get(curr[partnerAIndex]) == null
                    ? 0
                    : people.get(curr[i]).get(curr[partnerAIndex]);
            let partnerBHappiness =
                people.get(curr[i]).get(curr[partnerBIndex]) == null
                    ? 0
                    : people.get(curr[i]).get(curr[partnerBIndex]);

            happiness += partnerAHappiness + partnerBHappiness;
        }

        return happiness > total ? happiness : total;
    }, -Infinity);

    return { value: answer };
}
