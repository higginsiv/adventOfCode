module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const [low, high] = rawData.split('-').map((x) => parseInt(x));

    let answer = 0;
    for (let i = low; i <= high; i++) {
        let pass = i.toString().split('');
        let ascDigs = true;
        let twoAdj = false;

        let lastDig;
        while (pass.length > 0) {
            let dig = parseInt(pass.shift());
            if (lastDig && dig < lastDig) {
                ascDigs = false;
                break;
            }
            if (lastDig === dig) {
                twoAdj = true;
            }
            lastDig = dig;
        }
        if (ascDigs && twoAdj) {
            answer++;
        }
    }
    return { value: answer };
}
