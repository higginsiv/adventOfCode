module.exports = {solve: solve};

function solve({lines, rawData}) {
    let elves = Array(Number(rawData)).fill().map((_, index) => index + 1);

    while (elves.length > 1) {
        const shouldRemoveFirst = elves.length % 2 === 1;

        elves = elves.filter((elf, index) => {
            if (index % 2 === 0) {
                return true;
            }
        });
        if (shouldRemoveFirst) {
            elves.shift();
        }
    }

    let answer = elves[0];
    return {value: answer};
}