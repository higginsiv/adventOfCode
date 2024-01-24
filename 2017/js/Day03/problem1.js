module.exports = { solve: solve };

function solve({ lines, rawData }) {
  const { ceil, abs } = Math;

  function getEastAtRing(ring) {
    if (ring === 0) {
      return 1;
    }
    return 8 * (ring - 1) + 1 + getEastAtRing(ring - 1);
  }

  function getRing(num) {
    let ring = 0;
    let maxInRing = 1;
    let modifier = 8;
    while (num > maxInRing) {
      ring++;
      maxInRing += modifier;
      modifier += 8;
    }
    return ring;
  }

  const input = parseInt(rawData);

  const ring = getRing(input);

  const east = getEastAtRing(ring);
  const north = east + 2 * ring;
  const west = north + 2 * ring;
  const south = west + 2 * ring;

  const fencePost = ceil((north - east) / 2);

  let offset;
  if (input <= east + fencePost && input >= east - fencePost) {
    offset = input - east;
  } else if (input <= north + fencePost && input >= north - fencePost) {
    offset = input - north;
  } else if (input <= west + fencePost && input >= west - fencePost) {
    offset = input - west;
  } else if (input <= south + fencePost && input >= south - fencePost) {
    offset = input - south;
  }

  let answer = abs(offset) + ring;
  return { value: answer };
}
