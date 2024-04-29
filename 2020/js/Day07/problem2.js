module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const GOAL_BAG_TYPE = 'shiny gold';

    let bags = new Map();
    const data = lines.forEach((x) => {
        x = x.replaceAll(' bags', '');
        x = x.replaceAll(' bag', '');
        let [bagType, childBagDetails] = x.split(' contain ');
        childBagDetails = childBagDetails.replaceAll('.', '');
        if (!childBagDetails.includes('no other')) {
            childBagDetails = childBagDetails.split(', ').map((y) => {
                y = y.replace(' ', '***');
                y = y.split('***');
                y[0] = parseInt(y[0]);
                return y;
            });
            bags.set(bagType, childBagDetails);
        }
    });

    let bagsToInnerBags = new Map();

    const answer = sumBags(GOAL_BAG_TYPE);

    function sumBags(bagType) {
        if (bagsToInnerBags.get(bagType) != null) {
            return bagsToInnerBags.get(bagType);
        }

        let childrenBags = bags.get(bagType);
        if (childrenBags == null) {
            return 0;
        }

        let childrenBagTotal = 0;
        childrenBags.forEach((childBagType) => {
            let childSum = sumBags(childBagType[1]);
            let childTotal = childBagType[0] * childSum + childBagType[0];
            if (bagsToInnerBags.get(childBagType) == null) {
                bagsToInnerBags.set(childBagType, childSum);
            }
            childrenBagTotal += childTotal;
        });

        bagsToInnerBags.set(bagType, childrenBagTotal);
        return childrenBagTotal;
    }

    return { value: answer };
}
