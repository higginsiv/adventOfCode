const fs = require('fs');
module.exports = {
	getInput: function (year, dayNumber, delimiter = /\r?\n/, inputFile = 'input.txt') {
		return fs.readFileSync("./" + year + "/js/Day" + dayNumber + "/" + inputFile)
			.toString()
			.split(delimiter);
	},
}