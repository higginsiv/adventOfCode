const fs = require('fs');
module.exports = {
	getInput: function (dayNumber, delimiter = '\n', inputFile = 'input.txt') {

		return fs.readFileSync("./js/Day" + dayNumber + "/" + inputFile)
			.toString()
			.split(delimiter);
	},
};