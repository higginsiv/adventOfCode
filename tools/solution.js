export class Solution {
    value;
    outputStrategy;

    constructor(value, outputStrategy = new LogStrategy()) {
        this.value = value;
        this.outputStrategy = outputStrategy;
    }

    output() {
        this.outputStrategy.execute(this.value);
    }
}

export class LogStrategy {
    execute(value) {
        console.log(value);
    }
}

export class GridStrategy {
    onChar = '⬜';
    offChar = '⬛';
    onValues;

    constructor(onValues) {
        if (Array.isArray(onValues)) {
            this.onValues = onValues;
        } else {
            this.onValues = [onValues];
        }
    }

    execute(grid) {
        grid = grid.map((row) =>
            row.map((char) => (this.onValues.includes(char) ? this.onChar : this.offChar)),
        );
        grid.forEach((row) => console.log(row.join('')));
    }
}

export class FileStrategy {
    year;
    day;
    part;

    constructor(year, day, part) {
        this.year = year;
        this.day = day;
        this.part = part;
    }

    execute(value) {
        fs.writeFileSync(`${this.year}/js/Day${this.day}/output-${this.part}.txt`, String(value));
    }
}
