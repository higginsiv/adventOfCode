const fs = require('fs');
module.exports = {
	getInput: function (dayNumber) {
		return fs.readFileSync("./js/Day" + dayNumber + "/input.txt")
			.toString()
			.split('\n');
	},
};