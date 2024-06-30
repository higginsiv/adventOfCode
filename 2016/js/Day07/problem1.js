export default function solve({ lines, rawData }) {
    const regexInvalid = /\[[^\]]*?(\w)(?!\1)(\w)\2\1[^\]]*?\]/;
    const regexValid = /(\w)(?!\1)(\w)\2\1/;

    const answer = lines.reduce((total, line) => {
        if (!regexInvalid.test(line) && regexValid.test(line)) {
            total++;
        }
        return total;
    }, 0);

    return { value: answer };
}
