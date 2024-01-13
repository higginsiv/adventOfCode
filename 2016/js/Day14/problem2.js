module.exports = {solve: solve};

function solve({lines, rawData}) {
    const CREATE_HASH = require('node:crypto').createHash;

    const LOOPS = 2016;

    let allHashes = {};
    let index = 0;
    let numKeys = 0;
    let uniqueHashes = {};

    while (numKeys < 64) {
        if (index % 1000 === 0)console.log(index)

        let expandedHash = getExpandedHash(`${rawData}${index}`);

        let matches = expandedHash.match(/(.)\1\1/);
        if (matches && matches[1]) {
            let char = matches[1];
            let regex = new RegExp(`${char}{5}`);

            for (let i = 1; i <= 1000; i++) {
                let hash2 = getExpandedHash(`${rawData}${index+i}`);

                if (hash2.match(regex)) {
                    console.log('found')
                    numKeys++;
                    break;
                }
            }
        }
        index++;
    }

    function getExpandedHash(str) {
        let hash = str;
        for (let i = 0; i <= LOOPS; i++) {
            hash = getHash(hash);
        }
        return hash;
    }

    function getHashes(str) {
        if (allHashes[str]) {
            return allHashes[str];
        } else {
            const hash = CREATE_HASH('md5').update(str).digest('hex');
            allHashes[str] = [hash];
            return [hash];
        }
    }

    function getExpandedHashRecursive(str, n) {
        if (n === 0) {
            return [str];
        }

        let hashes = getHashes(str);
        let numHashes = hashes.length;
        let hashToSend = hashes[numHashes - 1];

        let downStreamHashes = getExpandedHashRecursive(hashToSend, n-numHashes);
        allHashes[str].push(...downStreamHashes);
        return [...hashes, ...downStreamHashes];
    }
    // function hashNTimes(hash, n) {
    //     if (n === 0) {
    //         return hash;
    //     }

    //     if (!hashes[hash]) {
    //         hashes[hash] = [];
    //     }

    //     if (hashes[hash].length >= n) {
    //         return hashes[hash][n-1];
    //     } else {
    //         let numOfHashes = hashes[hash].length;
    //         if (numOfHashes !== 0) {
    //             let furthestHash = hashes[hash][numOfHashes - 1];
    //             let newN = n - numOfHashes;
    //             return hashNTimes(furthestHash, newN);
    //         }
    //         let furthestHash = hashes[hash][numOfHashes - 1];
    //         let newN = n - numOfHashses;

    //         let nextHash = CREATE_HASH('md5').update(hash).digest('hex');
    //         hashes[hash].push(nextHash);
    //         return hashNTimes(nextHash, n);
    //     }

    //     let currentHash = CREATE_HASH('md5').update(`${rawData}${index}`).digest('hex');
    //     let value = hashNTimes(, n-1);
    //     hashes[index] = value;
    //     return value;
    // }

    // while (numKeys < 64) {
    //     if (index % 1000 === 0)console.log(index)
    //     let hash = hash(`${rawData}${index}`);

    //     if (!hashes[hash]) {
    //         hashes[hash] = [];
    //     }

    //     let hashesToSkip = hashes[hash].length;
    //     if (hashesToSkip > 0) {
    //         let hash = hashes[hash][hashesToSkip - 1];
    //     }

    //     for (let i = hashesToSkip; i < LOOPS; i++) {
    //         hash = hash(hash);
    //         hashes[hash].push(hash);
    //     }

    //     let matches = HASH.match(/(.)\1\1/);
    //     if (matches && matches[1]) {
    //         let char = matches[1];
    //         let regex = new RegExp(`${char}{5}`);

    //         for (let i = 1; i <= 1000; i++) {
    //             let HASH2 = hashes[index+i];
    //             if (!HASH2) {
    //                 HASH2 = CREATE_HASH('md5').update(`${rawData}${index+i}`).digest('hex');
    //                 hashes[index+i] = HASH2;
    //             }

    //             if (HASH2.match(regex)) {
    //                 console.log('found')
    //                 numKeys++;
    //                 break;
    //             }
    //         }
    //     }

    //     index++;
    // }

    let answer = index - 1;
    return {value: answer};
}