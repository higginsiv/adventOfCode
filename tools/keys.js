module.exports = {
	generateKey: generateKey
};

// Coerce values to string and concatenate
function generateKey(val1, val2, delim = '.') {
    return val1 + delim + val2;
}
