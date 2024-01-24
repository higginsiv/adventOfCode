const fr = require('../../../tools/fileReader');
const EOL = require('os').EOL;
const [YEAR, DAY, PART] = ['2023', '05', '2'];
const DATA = fr.getInput(YEAR, DAY, EOL + EOL);

let seeds = DATA[0].match(/\d+\s\d+/g).map((x) => {
  x = x.match(/\d+/g).map((y) => parseInt(y));
  return [x[0], x[0] + x[1] - 1];
});

let mappings = [];

for (let i = 1; i < DATA.length; i++) {
  mappings.push(buildMapping(DATA[i]));
}

mappings.forEach((mapp) => {
  seeds = findMapping(mapp, seeds);
  seeds = condenseRanges(seeds);
});

function buildMapping(dataString) {
  let mapping = dataString.split(EOL);
  mapping.shift();
  mapping = mapping.map((line) => line.match(/\d+/g).map((x) => parseInt(x)));
  return mapping;
}

function findMapping(mapp, seedRanges) {
  let newSeedRanges = [];
  let seedRangesWithMapping = [];

  seedRanges.forEach(([seed, seedEnd]) => {
    for (let i = 0; i < mapp.length; i++) {
      const [DEST_RANGE_START, SOURCE_RANGE_START, RANGE_LENGTH] = mapp[i];
      const SOURCE_END = SOURCE_RANGE_START + RANGE_LENGTH - 1;
      const DEST_END = DEST_RANGE_START + RANGE_LENGTH - 1;
      const overlap = findOverlap([seed, seedEnd], [SOURCE_RANGE_START, SOURCE_END]);

      if (overlap) {
        const [OVERLAP_START, OVERLAP_END] = overlap;

        newSeedRanges.push([
          DEST_RANGE_START + (OVERLAP_START - SOURCE_RANGE_START),
          DEST_END - (SOURCE_END - OVERLAP_END),
        ]);

        seedRangesWithMapping.push([OVERLAP_START, OVERLAP_END]);
      }
    }
  });

  if (seedRangesWithMapping.length !== 0) {
    seedRangesWithMapping = condenseRanges(seedRangesWithMapping);
  }

  getSeedRangesWithoutMapping(seedRanges, seedRangesWithMapping).forEach((range) => {
    newSeedRanges.push(range);
  });
  return newSeedRanges;
}

function getSeedRangesWithoutMapping(allSeedRanges, mappedSeedRanges) {
  let result = [];

  for (let range1 of allSeedRanges) {
    let parts = [range1];

    for (let range2 of mappedSeedRanges) {
      let newParts = [];

      for (let part of parts) {
        if (part[1] >= range2[0] && part[0] <= range2[1]) {
          // The part overlaps with the range in B
          // Break up the part into new parts that don't overlap with the range in B
          if (part[0] < range2[0]) newParts.push([part[0], range2[0] - 1]);
          if (part[1] > range2[1]) newParts.push([range2[1] + 1, part[1]]);
        } else {
          // The part doesn't overlap with the range in B
          // Add it to the new parts as is
          newParts.push(part);
        }
      }

      parts = newParts;
    }

    result.push(...parts);
  }

  return result;
}

function findOverlap(range1, range2) {
  if (range1[0] > range2[1] || range1[1] < range2[0]) {
    return null;
  }

  return [Math.max(range1[0], range2[0]), Math.min(range1[1], range2[1])];
}

function condenseRanges(ranges) {
  ranges.sort((a, b) => a[0] - b[0]);

  let result = [ranges[0]];

  for (let i = 1; i < ranges.length; i++) {
    let lastRange = result[result.length - 1];
    let currentRange = ranges[i];

    // If the current range overlaps with the last range, merge them
    if (currentRange[0] <= lastRange[1]) {
      lastRange[1] = Math.max(lastRange[1], currentRange[1]);
    } else {
      // Otherwise, add the current range to the result
      result.push(currentRange);
    }
  }

  return result;
}

let answer = seeds.reduce((lowest, seedRanges) => {
  return seedRanges[0] < lowest ? seedRanges[0] : lowest;
}, Infinity);

console.log(`Year ${YEAR} Day ${DAY} Puzzle ${PART}: ${answer}`);
