const { run } = require('jest');

module.exports = { solve: solve, getGroups: getGroups, runSimulation: runSimulation };
const EOL = require('os').EOL;
const { floor } = Math;
const [IMMUNE, INFECTION] = [0, 1];
const TYPES = ['cold', 'fire', 'slashing', 'radiation', 'bludgeoning'];

function solve({ lines, rawData }) {
    let groups = runSimulation(getGroups(rawData));
    const answer = groups.reduce((acc, group) => acc + group.units, 0);
    return { value: answer };
}

function runSimulation(groups, boost = 0) {
    if (boost > 0) {
        groups = groups.map((group) => {
            if (group.affiliation === IMMUNE) {
                group.damage += boost;
            }
            return group;
        });
    }

    let groupDied = false;
    while (
        groups.some((group) => group.affiliation === IMMUNE) &&
        groups.some((group) => group.affiliation === INFECTION)
    ) {
        populateEffectivePower(groups);
        groups.sort(sortByPowerThenInitiative);
        populateTargetSelection(groups);
        groupDied = attack(groups);
        if (groupDied) {
            groups = groups.filter((group) => group.units > 0);
        }
    }

    return groups;
}

function populateEffectivePower(groups) {
    groups.forEach((group) => {
        group.effectivePower = group.units * group.damage;
    });
}

function getGroups(rawData) {
    let armies = rawData.split(EOL + EOL);
    armies = armies.map((army) => {
        army = army.split(EOL);
        let affiliation = army.shift();
        army = army.map((line) => {
            let numbers = line.match(/\d+/g).map(Number);
            let multipliers = line.substring(line.indexOf('(') + 1, line.indexOf(')')).split('; ');
            let weak;
            let immune;
            multipliers.forEach((multiplier) => {
                if (multiplier.startsWith('weak')) {
                    weak = multiplier
                        .substring(multiplier.indexOf('to ') + 3)
                        .split(', ')
                        .map((type) => TYPES.indexOf(type));
                } else if (multiplier.startsWith('immune')) {
                    immune = multiplier
                        .substring(multiplier.indexOf('to ') + 3)
                        .split(', ')
                        .map((type) => TYPES.indexOf(type));
                }
            });
            let group = {
                affiliation: affiliation === 'Immune System:' ? IMMUNE : INFECTION,
                units: numbers[0],
                hp: numbers[1],
                damage: numbers[2],
                effectivePower: numbers[0] * numbers[2],
                initiative: numbers[3],
                damageType: TYPES.indexOf(
                    line.match(/(cold|fire|slashing|radiation|bludgeoning) damage/)[1],
                ),
                weak: weak || [],
                immune: immune || [],
            };
            return group;
        });
        return army;
    });
    return armies.flat();
}

function calculateDamage(attacker, defender) {
    attacker.effectivePower = attacker.units * attacker.damage;
    if (defender.immune.includes(attacker.damageType)) {
        return 0;
    }
    if (defender.weak.includes(attacker.damageType)) {
        return attacker.effectivePower * 2;
    }
    return attacker.effectivePower;
}

function sortByPowerThenInitiative(a, b) {
    if (a.effectivePower !== b.effectivePower) {
        return b.effectivePower - a.effectivePower;
    }
    return sortByInitiative(a, b);
}

function sortByInitiative(a, b) {
    return b.initiative - a.initiative;
}

function populateTargetSelection(groups) {
    groups.forEach((group) => {
        group.targetedBy = null;
        group.target = null;
    });
    groups.forEach((group) => {
        let possibleTargets = [];
        let possibleDamage = -Infinity;

        groups.forEach((target) => {
            if (target.affiliation !== group.affiliation && !target.targetedBy) {
                let damage = calculateDamage(group, target);
                if (damage > possibleDamage) {
                    possibleTargets = [target];
                    possibleDamage = damage;
                } else if (damage === possibleDamage) {
                    possibleTargets.push(target);
                }
            }
        });
        if (possibleDamage > 0) {
            let target = possibleTargets.sort(sortByPowerThenInitiative)[0];
            target.targetedBy = group;
            group.target = target;
        }
    });
}

function attack(groups) {
    let groupDied = false;
    groups.sort(sortByInitiative);
    groups.forEach((group) => {
        if (group.target) {
            group.target.units -= floor(calculateDamage(group, group.target) / group.target.hp);
            if (group.target.units <= 0) {
                group.target.units = 0;
                groupDied = true;
                group.target.targetedBy = null;
            }
        }
    });
    return groupDied;
}
