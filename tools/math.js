module.exports = {
    getLCM: function (a, b) {
        return (a * b) / getGCD(a, b);
    },
    getGCD: getGCD,
	permute: permute
};

function getGCD(a, b) {
    return b == 0 ? a : getGCD(b, a % b);
}

function permute(data, perm = [], results = []) {
    if (data.length === 0) {
        results.push(perm);
        return;
    } else {
        for (let i = 0; i < data.length; i++) {
            let curr = data.slice();
            let next = curr.splice(i, 1);
            permute(curr.slice(), perm.concat(next), results);
        }
    }
	return results;
}
