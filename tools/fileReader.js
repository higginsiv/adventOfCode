const fs = require('fs');
const {EOL} = require('os');
module.exports = {
	getInput: function (year, dayNumber, delimiter = EOL, inputFile = 'input.txt') {
		return fs.readFileSync("./" + year + "/js/Day" + dayNumber + "/" + inputFile)
			.toString()
			.split(delimiter);
	},
	getRawInput: function (year, dayNumber, inputFile = 'input.txt') {
		return fs.readFileSync("./" + year + "/js/Day" + dayNumber + "/" + inputFile)
			.toString();
	}
}