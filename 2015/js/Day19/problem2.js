import { EOL } from 'os';

export default function solve({ lines, rawData }) {
    const data = rawData.split(EOL + EOL);

    const MOLECULE = data[1];
    let replacements = new Map();

    data[0].split(EOL).forEach((x) => {
        x = x.split(' => ');
        if (replacements.get(x[1]) == null) {
            replacements.set(x[1], []);
        }
        replacements.get(x[1]).push(x[0]);
    });

    let fastest = Infinity;
    let currentMolecule = MOLECULE;
    let goalMolecule = 'e';

    let moleculesToSteps = new Map();
    moleculesToSteps.set(currentMolecule, 0);

    let permutations = [currentMolecule];

    while (permutations.length > 0) {
        // console.log(permutations.length);
        currentMolecule = permutations.shift();
        // console.log(currentMolecule.length);
        let currentSteps = moleculesToSteps.get(currentMolecule);
        console.log(currentSteps);
        if (currentSteps + 1 >= fastest) {
            continue;
        }
        let newnew = new Set();

        replacements.forEach((value, key) => {
            value.forEach((replacement) => {
                let lastIndexOf = -Infinity;

                while (true) {
                    let index = currentMolecule.indexOf(key, lastIndexOf + 1);
                    if (index !== -1 && index > lastIndexOf) {
                        let firstPart = currentMolecule.substring(0, index);
                        let secondPart = currentMolecule.substring(index);
                        secondPart = secondPart.replace(key, replacement);

                        let newMolecule = firstPart + secondPart;

                        if (newMolecule === goalMolecule) {
                            console.log(newMolecule);
                            console.log('GOALLLLLLL ' + currentSteps + 1);
                            fastest = currentSteps + 1 < fastest ? currentSteps + 1 : fastest;
                            break;
                        }

                        if (newMolecule.includes(goalMolecule)) {
                            break;
                        }

                        if (
                            moleculesToSteps.get(newMolecule) == null ||
                            moleculesToSteps.get(newMolecule) > currentSteps + 1
                        ) {
                            if (moleculesToSteps.get(newMolecule) == null) {
                                newnew.add(newMolecule);
                            }
                            moleculesToSteps.set(newMolecule, currentSteps + 1);
                        }

                        lastIndexOf = index;
                    } else {
                        break;
                    }
                }
            });
        });
        permutations.push(...newnew);
        permutations.sort((a, b) => {
            if (moleculesToSteps.get(a) == null || moleculesToSteps.get(b) == null) {
                console.log('whoops' + a + ' ' + b);
            }
            let sort = moleculesToSteps.get(b) - moleculesToSteps.get(a);
            if (sort === 0) {
                return a.length - b.length;
            }
            return sort;
        });
    }

    let answer = fastest;
    return { value: answer };
}
