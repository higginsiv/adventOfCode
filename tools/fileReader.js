const fs = require('fs');
module.exports = {
	getInput: function (dayNumber) {
		return fs.readFileSync("./Day" + dayNumber + "/input.txt")
			.toString()
			.split('\n');
	},
};