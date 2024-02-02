module.exports = { solve: solve };

// These values came from analysis of the input data
function solve() {
    let b = 84 * 100 + 100000;
    const c = b + 17000;

    let g;
    let h = 0;

    while (g !== 0) {   
        for (let d = 2; d * d <= b; d++) {
          if (b % d == 0) {
            h++;
            break;
          }
        }
    
        g = b - c;
        b += 17;
      }

    return { value: h };
}
