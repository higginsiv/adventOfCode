module.exports = { solve: solve };

function solve({ lines, rawData }) {
    const [ONE, ZERO, FLOAT] = ['1', '0', 'X'];

    let memory = new Map();
    let mask;
    lines.forEach((line) => {
        if (line.includes('mask')) {
            mask = line.substring(line.lastIndexOf(' ') + 1).split('');
        } else {
            line = line.replace('mem[', '');
            line = line.replace('] =', '');
            let [address, value] = line.split(' ');

            address = convertAddress(parseInt(address));
            let addresses = maskAddress(address, 0);
            addresses.forEach((add) => {
                memory.set(add.join(''), value);
            });
        }
    });

    const answer = Array.from(memory.values()).reduce((total, curr) => {
        return total + parseInt(curr);
    }, 0);

    // Convert an int to a padded base 2 array
    function convertAddress(address) {
        return address.toString(2).padStart(mask.length, '0').split('');
    }

    // mask address starting at index provided
    function maskAddress(address, index) {
        let addresses = new Set();
        for (let i = index; i < mask.length; i++) {
            let char = mask[i];
            switch (char) {
                case ONE:
                    address[i] = char;
                    break;
                case FLOAT:
                    let address1 = address.slice();
                    let address0 = address.slice();
                    address1[i] = ONE;
                    address0[i] = ZERO;
                    let addresses1 = maskAddress(address1, i + 1);
                    let addresses0 = maskAddress(address0, i + 1);
                    addresses = new Set([...addresses, ...addresses1, ...addresses0]);
            }
        }

        addresses.add(address);
        return addresses;
    }
    return { value: answer };
}
