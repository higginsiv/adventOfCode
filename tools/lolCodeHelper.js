const fr = require('./fileReader');
const fs = require('fs');
const day = process.argv[2];
const data = fr.getInput(day);

let arrayText = 'I HAS A array ITZ A BUKKIT\n';

for (let i = 0; i < data.length; i++) {
	arrayText += ('array HAS A item ' + i + ' ITZ ' + data[i] + '\n');
}

fs.writeFileSync(
	"./Day" + day + "/lolcode/lolInput.txt",
	arrayText
);

