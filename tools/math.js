module.exports = {
	getLCM: function (a, b) {
		return (a * b) / getGCD(a, b);
	},
    getGCD: getGCD
}

function getGCD(a, b) {
    return b == 0 ? a : getGCD(b, a % b);
}