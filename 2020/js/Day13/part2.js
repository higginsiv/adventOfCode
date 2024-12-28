export default function solve({ lines, rawData }) {
    let trainIds = [];
    let indices = [];

    lines[1]
        .split(',')
        .map(Number)
        .forEach((id, index) => {
            if (!isNaN(id)) {
                trainIds.push(BigInt(id));
                indices.push(BigInt(id - (index % id)));
            }
        });

    function extendedGcd(a, b) {
        if (a === 0n) {
            return [b, 0n, 1n];
        }

        let [g, x, y] = extendedGcd(b % a, a);
        return [g, y - (b / a) * x, x];
    }

    function modInverse(a, m) {
        let [g, x] = extendedGcd(a, m);
        if (g !== 1n) {
            throw 'Modular inverse does not exist';
        } else {
            return ((x % m) + m) % m;
        }
    }

    function chineseRemainder(n, a) {
        let totalProduct = n.reduce((a, b) => a * b, 1n);
        let p;
        let sum = 0n;
        for (let i = 0; i < n.length; i++) {
            p = totalProduct / n[i];
            sum += a[i] * modInverse(p, n[i]) * p;
        }
        return sum % totalProduct;
    }

    const answer = Number(chineseRemainder(trainIds, indices));

    return { value: answer };
}
