export default function solve({ lines, rawData }) {
    let data = rawData.split(',').map((x) => parseInt(x));

    let fishDays = [];

    data.forEach((x) => {
        if (fishDays[x] == null) {
            fishDays[x] = [0];
        }
        fishDays[x]++;
    });

    const numOfDays = 256;

    for (let i = 0; i < numOfDays; i++) {
        let newFish = Array(9).fill(0);
        fishDays.forEach((fish, index) => {
            if (index === 0) {
                newFish[6] = fish;
                newFish[8] = fish;
            } else {
                newFish[index - 1] += fish;
            }
        });

        fishDays = newFish;
    }

    const result = fishDays.reduce((previous, current) => {
        return previous + current;
    }, 0);
    return { value: result };
}
