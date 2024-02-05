const { map } = require('async');

module.exports = { solve: solve };

function solve({ lines, rawData }) {
    function addToFrequencyMap(key, start, end) {
        if (!guardIdToAsleepMinuteFrequency.has(key)) {
            guardIdToAsleepMinuteFrequency.set(key, new Array(60).fill(0));
        }
        for (let i = start; i < end; i++) {
            guardIdToAsleepMinuteFrequency.get(key)[i]++;
        }
    }

    let guardIdToTotalMinutesAsleep = new Map();
    let guardIdToAsleepMinuteFrequency = new Map();
    let currentGuard = null;
    let lastTime = null;

    lines = lines
        .map((line) => {
            const date = new Date(`${line.substring(1, 17)}z`);
            const wakesUp = line.includes('wakes up');
            const fallsAsleep = line.includes('falls asleep');
            const beginsShift = !wakesUp && !fallsAsleep;
            const guardId = line.match(/#(\d+)/);
            return {
                date,
                wakesUp,
                fallsAsleep,
                beginsShift,
                guardId: guardId ? parseInt(guardId[1]) : null,
            };
        })
        .sort((a, b) => a.date - b.date)
        .forEach((line) => {
            if (line.beginsShift) {
                currentGuard = line.guardId;
            } else if (line.fallsAsleep) {
                lastTime = line.date;
            } else if (line.wakesUp) {
                const lastTimeMinutes = lastTime.getUTCMinutes();
                const currentTimeMinutes = line.date.getUTCMinutes();
                const timeAsleep = currentTimeMinutes - lastTimeMinutes;

                if (!guardIdToTotalMinutesAsleep.has(currentGuard)) {
                    guardIdToTotalMinutesAsleep.set(currentGuard, 0);
                }
                guardIdToTotalMinutesAsleep.set(
                    currentGuard,
                    guardIdToTotalMinutesAsleep.get(currentGuard) + timeAsleep,
                );
                addToFrequencyMap(currentGuard, lastTimeMinutes, currentTimeMinutes);
            }
        });

    const sleepiestGuard = [...guardIdToTotalMinutesAsleep.entries()].reduce((acc, curr) =>
        curr[1] > acc[1] ? curr : acc,
    )[0];
    const sleepiestMinute = guardIdToAsleepMinuteFrequency
        .get(sleepiestGuard)
        .reduce(
            (acc, curr, index) =>
                curr > guardIdToAsleepMinuteFrequency.get(sleepiestGuard)[acc] ? index : acc,
            0,
        );

    const answer = sleepiestGuard * sleepiestMinute;
    return { value: answer };
}
