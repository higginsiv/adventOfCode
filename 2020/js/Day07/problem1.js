console.time();
const fr = require('../../../tools/fileReader');
const [year, day, part] = ['2020', '07', '1'];
const GOAL_BAG_TYPE = 'shiny gold';

let bags = new Map();
const data = fr.getInput(year, day).forEach((x) => {
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

let containsShinyGold = new Set();

bags.forEach((value, bagType) => {
    contains(GOAL_BAG_TYPE, bagType);
});

function contains(goalBagType, bagType) {
    if (containsShinyGold.has(bagType)) {
        return true;
    }

    let childrenBags = bags.get(bagType);
    if (childrenBags == null) {
        return false;
    }

    let childContainsGoalBagType = false;
    childrenBags.forEach((childBagType) => {
        if (childBagType[1] === GOAL_BAG_TYPE) {
            childContainsGoalBagType = true;
        } else {
            let containsGoalBagType = contains(goalBagType, childBagType[1]);
            if (containsGoalBagType) {
                containsShinyGold.add(childBagType[1]);
                childContainsGoalBagType = true;
            }
        }
    });

    if (childContainsGoalBagType) {
        containsShinyGold.add(bagType);
    }
    return childContainsGoalBagType;
}

let answer = containsShinyGold.size;
console.log('Year ' + year + ' Day ' + day + ' Puzzle ' + part + ': ' + answer);
console.timeEnd();
