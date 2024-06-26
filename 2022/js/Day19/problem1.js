export default function solve({ lines, rawData }) {
    const { max, ceil } = Math;
    class Blueprint {
        id;
        oreBotCost;
        clayBotCost;
        obsBotOreCost;
        obsBotClayCost;
        geoBotOreCost;
        geoBotObsCost;
        constructor(
            id,
            oreBotCost,
            clayBotCost,
            obsBotOreCost,
            obsBotClayCost,
            geoBotOreCost,
            geoBotObsCost,
        ) {
            this.id = id;
            this.oreBotCost = oreBotCost;
            this.clayBotCost = clayBotCost;
            this.obsBotOreCost = obsBotOreCost;
            this.obsBotClayCost = obsBotClayCost;
            this.geoBotOreCost = geoBotOreCost;
            this.geoBotObsCost = geoBotObsCost;
        }
    }

    const data = lines
        .map((x) => {
            x = x.replace('Blueprint ', '');
            x = x.replace(': Each ore robot costs ', ' ');
            x = x.replace(' ore. Each clay robot costs ', ' ');
            x = x.replace(' ore. Each obsidian robot costs ', ' ');
            x = x.replace(' ore and ', ' ');
            x = x.replace(' clay. Each geode robot costs ', ' ');
            x = x.replace(' ore and ', ' ');
            x = x.replace(' obsidian.', '');
            x = x.split(' ').map((y) => parseInt(y));
            return x;
        })
        .map((x) => new Blueprint(...x));

    const ORE_BOT = 0;
    const CLAY_BOT = 1;
    const OBS_BOT = 2;
    const GEO_BOT = 3;
    const MAX_MIN = 24;
    const ORE_BOT_MAX = 4;
    const CLAY_BOT_MAX = 15;

    let sum = data.reduce((sum, curr) => {
        let result = buildR2(curr, 1, 1, 0, 0, 0, 0, 0, 0, 0, ORE_BOT_MAX, CLAY_BOT_MAX);

        return sum + result * curr.id;
    }, 0);

    function buildR2(
        print,
        minutes,
        oreBots,
        clayBots,
        obsBots,
        geoBots,
        ore,
        clay,
        obs,
        geos,
        oreBotMax,
        clayBotMax,
    ) {
        let options = [];
        if (minutes > MAX_MIN) {
            return geos;
        }

        if (oreBots > 0) {
            let oreReqOreBot = max(ceil((print.oreBotCost - ore) / oreBots), 0);
            let oreReqClayBot = max(ceil((print.clayBotCost - ore) / oreBots), 0);
            if (minutes + oreReqOreBot < MAX_MIN && oreBots < oreBotMax) {
                options.push([oreReqOreBot, ORE_BOT]);
            }
            if (minutes + oreReqClayBot < MAX_MIN && clayBots < clayBotMax) {
                options.push([oreReqClayBot, CLAY_BOT]);
            }
        }

        if (clayBots > 0 && obsBots < print.geoBotObsCost) {
            let oreReqObsBot = max(ceil((print.obsBotOreCost - ore) / oreBots), 0);
            let clayReqObsBot = max(ceil((print.obsBotClayCost - clay) / clayBots), 0);
            let timeCost = max(oreReqObsBot, clayReqObsBot);
            if (minutes + timeCost < MAX_MIN) {
                options.push([timeCost, OBS_BOT]);
            }
        }

        if (obsBots > 0) {
            let oreReqGeoBot = max(ceil((print.geoBotOreCost - ore) / oreBots), 0);
            let obsReqGeoBot = max(ceil((print.geoBotObsCost - obs) / obsBots), 0);
            let timeCost = max(oreReqGeoBot, obsReqGeoBot);

            if (minutes + timeCost < MAX_MIN) {
                options.push([timeCost, GEO_BOT]);
            }
        }

        if (options.length === 0) {
            return geos + (MAX_MIN + 1 - minutes) * geoBots;
        }

        let best = 0;
        options.forEach((x) => {
            const [timeCost, type] = x;
            let oreMod = 0;
            let clayMod = 0;
            let obsMod = 0;
            if (type === ORE_BOT) {
                oreMod = print.oreBotCost;
            } else if (type === CLAY_BOT) {
                oreMod = print.clayBotCost;
            } else if (type === OBS_BOT) {
                oreMod = print.obsBotOreCost;
                clayMod = print.obsBotClayCost;
            } else if (type === GEO_BOT) {
                oreMod = print.geoBotOreCost;
                obsMod = print.geoBotObsCost;
            }
            let result = buildR2(
                print,
                minutes + timeCost + 1,
                oreBots + (type === ORE_BOT ? 1 : 0),
                clayBots + (type === CLAY_BOT ? 1 : 0),
                obsBots + (type === OBS_BOT ? 1 : 0),
                geoBots + (type === GEO_BOT ? 1 : 0),
                ore + (timeCost + 1) * oreBots - oreMod,
                clay + (timeCost + 1) * clayBots - clayMod,
                obs + (timeCost + 1) * obsBots - obsMod,
                geos + (timeCost + 1) * geoBots,
                oreBotMax,
                clayBotMax,
            );
            if (result > best) {
                best = result;
            }
        });
        return best;
    }

    return { value: sum };
}
