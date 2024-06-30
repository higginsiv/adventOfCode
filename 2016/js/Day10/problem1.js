export default function solve({ lines, rawData }) {
    let keysToBots = new Map();
    let botStorages = {};
    let output = {};
    let answer;

    lines.forEach((line) => {
        if (line.startsWith('bot')) {
            let values = line.match(
                /bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)/,
            );

            bot = {
                key: parseInt(values[1]),
                lowType: values[2],
                lowKey: parseInt(values[3]),
                highType: values[4],
                highKey: parseInt(values[5]),
            };

            keysToBots.set(bot.key, bot);
        } else if (line.startsWith('value')) {
            let values = line.match(/value (\d+) goes to bot (\d+)/);
            let key = parseInt(values[2]);
            let botStorage = botStorages[key];

            if (botStorage === undefined) {
                botStorages[key] = [parseInt(values[1])];
            } else {
                botStorage.push(parseInt(values[1]));
            }
        }
    });

    while (!answer) {
        let keys = Object.keys(botStorages)
            .filter((key) => botStorages[key].length === 2)
            .map((key) => parseInt(key));

        for (let key of keys) {
            let botStorage = botStorages[key].sort((a, b) => a - b);
            if (botStorage[0] === 17 && botStorage[1] === 61) {
                answer = key;
                break;
            }

            let bot = keysToBots.get(key);

            if (bot.lowType === 'output') {
                output[bot.lowKey] == null
                    ? (output[bot.lowKey] = [botStorage[0]])
                    : output[bot.lowKey].push(botStorage[0]);
            } else {
                botStorages[bot.lowKey] == null
                    ? (botStorages[bot.lowKey] = [botStorage[0]])
                    : botStorages[bot.lowKey].push(botStorage[0]);
            }

            if (bot.highType === 'output') {
                output[bot.highKey] == null
                    ? (output[bot.highKey] = [botStorage[1]])
                    : output[bot.highKey].push(botStorage[1]);
            } else {
                botStorages[bot.highKey] == null
                    ? (botStorages[bot.highKey] = [botStorage[1]])
                    : botStorages[bot.highKey].push(botStorage[1]);
            }

            botStorages[key] = [];
        }
    }

    return { value: answer };
}
