const fr = require("../../../tools/fileReader");
const [year, day, part] = ["2022", "19", "1"];

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
    geoBotObsCost
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

const data = fr
  .getInput(year, day)
  .map((x) => {
    x = x.replace("Blueprint ", "");
    x = x.replace(": Each ore robot costs ", " ");
    x = x.replace(" ore. Each clay robot costs ", " ");
    x = x.replace(" ore. Each obsidian robot costs ", " ");
    x = x.replace(" ore and ", " ");
    x = x.replace(" clay. Each geode robot costs ", " ");
    x = x.replace(" ore and ", " ");
    x = x.replace(" obsidian.", "");
    x = x.split(" ").map((y) => parseInt(y));
    return x;
  })
  .map((x) => new Blueprint(...x));

const ORE_BOT = 0;
const CLAY_BOT = 1;
const OBS_BOT = 2;
const GEO_BOT = 3;
const NO_BUILD = 4;
const MAX_MIN = 24;
const ORE_BOT_MAX = 5;
const CLAY_BOT_MAX = 5;

function build(
  print
) {
    console.log(print)
    let [oreBots, clayBots, obsBots, geoBots] = [1, 0, 0, 0];
    let [ore, clay, obs, geos] = [0,0,0,0];

  for (let i = 0; i < MAX_MIN; i++) {

    // setup build
    let [geoBotMod, obsBotMod, clayBotMod, oreBotMod] = [0, 0, 0, 0];
    if (ore >= print.geoBotOreCost && obs >= print.geoBotObsCost) {
      // build Geo Bot
      ore -= print.geoBotOreCost;
      obs -= print.geoBotObsCost;
      geoBotMod++;
    } else if (
      ore >= print.obsBotOreCost &&
      clay >= print.obsBotClayCost &&
      obsBots < print.geoBotObsCost
    ) {
      // build Obs Bot
      ore -= print.obsBotOreCost;
      clay -= print.obsBotClayCost;
      obsBotMod++;
    } else if (ore >= print.clayBotCost && clayBots < print.obsBotClayCost) {
      // build clay bot
      ore -= print.clayBotCost;
      clayBotMod++;
    } else if (
      ore >= print.oreBotCost &&
      (oreBots < print.geoBotOreCost ||
        oreBots < print.obsBotOreCost ||
        oreBots < print.clayBotCost)
    ) {
      // build ore bot
      ore -= print.oreBotCost;
      oreBotMod++;
    }

    // collect resources
    geos += geoBots;
    obs += obsBots;
    clay += clayBots;
    ore += oreBots;

    // finish build
    geoBots += geoBotMod;
    obsBots += obsBotMod;
    clayBots += clayBotMod;
    oreBots += oreBotMod;

    console.log('*******************');
    console.log(i + 1)
    console.log('ore: ' + ore + ' bots: ' + oreBots);
    console.log('clay: ' + clay + ' bots: ' + clayBots);
    console.log('obs: ' + obs + ' bots: ' + obsBots);
    console.log('geo: ' + geos + ' bots: ' + geoBots);
    console.log('*******************')
  }
  return geos;
}
function buildR(
  print,
  minutes,
  oreBots,
  clayBots,
  obsBots,
  geoBots,
  ore,
  clay,
  obs,
  geos
) {
//     // console.log('min: ' + minutes + ' ore: ' + ore)
  let options = [];
  if (minutes > MAX_MIN) {
    return geos;
  }

//   if (oreBots > 0) {
//     let oreReqOreBot = Math.ceil((print.oreBotCost - ore) / oreBots);
//     let oreReqClayBot = Math.ceil((print.clayBotCost - ore) / oreBots);
//     if (minutes + oreReqOreBot <=  MAX_MIN) {
//         options.push([oreReqOreBot, ORE_BOT]);
//     }
//     if (minutes + oreReqClayBot <= MAX_MIN) {
//         options.push([oreReqClayBot, CLAY_BOT]);
//     }
//   }

//   if (clayBots > 0) {
//     let oreReqObsBot = Math.ceil((print.obsBotOreCost - ore) / oreBots);
//     let clayReqObsBot = Math.ceil((print.obsBotClayCost - clay) / clayBots);
//     let timeCost = Math.max(oreReqObsBot, clayReqObsBot);
//     if (minutes + timeCost < MAX_MIN) {
//         options.push([timeCost, OBS_BOT]);
//     }
//   }

//   if (obsBots > 0) {
//     let oreReqGeoBot = Math.ceil((print.geoBotOreCost - ore) / oreBots);
//     let obsReqGeoBot = Math.ceil((print.geoBotObsCost - obs) / obsBots);
//     let timeCost = Math.max(oreReqGeoBot, obsReqGeoBot);
//     if (minutes + timeCost < MAX_MIN) {
//         options.push([timeCost, GEO_BOT]);
//     }
//   }

//   if (options.length === 0) {
//     return geos + (MAX_MIN - minutes) * geoBots;
//   }

//   let best = 0;
//   options.forEach(x => {
//     const [timeCost, type] = x;
//     let oreMod = 0;
//     let clayMod = 0;
//     let obsMod = 0;
//     if (type === ORE_BOT) {
//         oreMod = print.oreBotCost;
//     } else if (type === CLAY_BOT) {
//         oreMod = print.clayBotCost;
//     } else if (type === OBS_BOT) {
//         oreMod = print.obsBotOreCost;
//         clayMod = print.obsBotClayCost;
//     } else if (type === GEO_BOT) {
//         oreMod = print.geoBotOreCost;
//         obsMod = print.geoBotObsCost;
//     }
//     let result = build(
//         print,
//         minutes + timeCost + 1,
//         oreBots + (type === ORE_BOT ? 1 : 0),
//         clayBots + (type === CLAY_BOT ? 1 : 0),
//         obsBots + (type === OBS_BOT ? 1 : 0),
//         geoBots + (type === GEO_BOT ? 1 : 0),
//         ore + ((timeCost + 1) * oreBots) - oreMod,
//         clay + ((timeCost + 1) * clayBots) - clayMod,
//         obs + ((timeCost + 1) * obsBots) - obsMod,
//         geos + ((timeCost + 1) * geoBots)
//     )
//     if (result > best) {
//         best = result;
//     }
//   });
//   return best;

  // define options, recurse
  if (ore >= print.geoBotOreCost && obs >= print.geoBotObsCost) {
    options.push([print.geoBotOreCost, 0, print.geoBotObsCost, GEO_BOT]);
  } else {
    if (ore >= print.oreBotCost) {
        options.push([print.oreBotCost, 0, 0, ORE_BOT]);
      }
    
      if (ore >= print.clayBotCost) {
        options.push([print.clayBotCost, 0, 0, CLAY_BOT]);
      }
    
      if (ore >= print.obsBotOreCost && clay >= print.obsBotClayCost) {
        options.push([print.obsBotOreCost, print.obsBotClayCost, 0, OBS_BOT]);
      }
      options.push([0, 0, 0, NO_BUILD]);
  }
 

  // collect resources
  ore += oreBots;
  clay += clayBots;
  obs += obsBots;
  geos += geoBots;

  // recurse thru options
  let bestOption = 0;
  options.forEach((x) => {
    const [oreMod, clayMod, obsMod, botType] = x;
    let locOre = ore;
    let locClay = clay;
    let locObs = obs;
    locOre -= oreMod;
    locClay -= clayMod;
    locObs -= obsMod;

    let oreBotMod = 0;
    let clayBotMod = 0;
    let obsBotMod = 0;
    let geoBotMod = 0;

    switch (botType) {
      case ORE_BOT:
        oreBotMod = 1;
        break;
      case CLAY_BOT:
        clayBotMod = 1;
        break;
      case OBS_BOT:
        obsBotMod = 1;
        break;
      case GEO_BOT:
        geoBotMod = 1;
        break;
    }
    let result = buildR(
      print,
      minutes + 1,
      oreBots + oreBotMod,
      clayBots + clayBotMod,
      obsBots + obsBotMod,
      geoBots + geoBotMod,
      locOre,
      locClay,
      locObs,
      geos
    );
    if (result > bestOption) {
      bestOption = result;
    }
  });

  return bestOption;
}

let sum = data.reduce((sum, curr) => {
    // let result = build(curr)
    let result = buildR2(curr,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0)
    console.log(result)
    return sum + (result * curr.id)
}, 0);

console.log("Year " + year + " Day " + day + " Puzzle " + part + ": " + sum);

// what is possible based on bots I have?
// ff to min required for that possibility
// plus fac * (time gap + 1)
// collect resources
// what is possible?


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
    geos
  ) {
  //     // console.log('min: ' + minutes + ' ore: ' + ore)
    let options = [];
    if (minutes > MAX_MIN) {
      return geos;
    }
  
    if (oreBots > 0) {
      let oreReqOreBot = Math.max(Math.ceil((print.oreBotCost - ore) / oreBots),0);
      let oreReqClayBot = Math.max(Math.ceil((print.clayBotCost - ore) / oreBots),0);
      if (minutes + oreReqOreBot <=  MAX_MIN && oreBots < ORE_BOT_MAX) {
          options.push([oreReqOreBot, ORE_BOT]);
      }
      if (minutes + oreReqClayBot <= MAX_MIN && clayBots < CLAY_BOT_MAX) {
          options.push([oreReqClayBot, CLAY_BOT]);
      }
    }
  
    if (clayBots > 0 && obsBots < print.geoBotObsCost) {
      let oreReqObsBot = Math.max(Math.ceil((print.obsBotOreCost - ore) / oreBots), 0);
      let clayReqObsBot = Math.max(Math.ceil((print.obsBotClayCost - clay) / clayBots),0);
      let timeCost = Math.max(oreReqObsBot, clayReqObsBot);
      if (minutes + timeCost < MAX_MIN) {
          options.push([timeCost, OBS_BOT]);
      }
    }
  
    if (obsBots > 0) {
      let oreReqGeoBot = Math.max(Math.ceil((print.geoBotOreCost - ore) / oreBots),0);
      let obsReqGeoBot = Math.max(Math.ceil((print.geoBotObsCost - obs) / obsBots),0);
      let timeCost = Math.max(oreReqGeoBot, obsReqGeoBot);
      if (minutes + timeCost < MAX_MIN) {
          options.push([timeCost, GEO_BOT]);
      }
    }
  
    if (options.length === 0) {
      return geos + (MAX_MIN - minutes) * geoBots;
    }
  
    let best = 0;
    options.forEach(x => {
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
          ore + ((timeCost + 1) * oreBots) - oreMod,
          clay + ((timeCost + 1) * clayBots) - clayMod,
          obs + ((timeCost + 1) * obsBots) - obsMod,
          geos + ((timeCost + 1) * geoBots)
      )
      if (result > best) {
          best = result;
      }
    });
    return best;
}

// 1302 too low