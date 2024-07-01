export default function solve({ lines, rawData }) {
    const Z = 'z'.charCodeAt(0);
    const ALPHA_LENGTH = 26;

    const DATA = lines.map((x) => {
        const [letters, sector, checksum] = x.match(/([a-z-]+)-(\d+)\[([a-z]+)\]/).slice(1);
        return { letters, sector: parseInt(sector), checksum };
    });

    let answer;
    for (let room of DATA) {
        const letters = room.letters.replace(/-/g, '').split('');
        const counts = letters.reduce((total, current) => {
            if (total[current] == null) {
                total[current] = 0;
            }

            total[current]++;
            return total;
        }, {});

        const sorted = Object.keys(counts).sort((a, b) => {
            if (counts[a] === counts[b]) {
                return a.localeCompare(b);
            }
            return counts[b] - counts[a];
        });

        const checksum = sorted.slice(0, 5).join('');
        if (checksum === room.checksum) {
            const shift = room.sector % ALPHA_LENGTH;
            const letters = room.letters.split('');
            const decrypted = letters.map((x) => {
                if (x === '-') {
                    return ' ';
                }

                const code = x.charCodeAt(0) + shift;
                if (code > Z) {
                    return String.fromCharCode(code - ALPHA_LENGTH);
                }
                return String.fromCharCode(code);
            });

            if (decrypted.join('').includes('north')) {
                answer = room.sector;
                break;
            }
        }
    }
    return { value: answer };
}
