export default function solve({ lines, rawData }) {
    let originalChars = 0;
    let encodedChars = 0;

    lines.forEach((curr) => {
        originalChars += curr.length;

        let encoded = ['"'];
        curr.split('').forEach((char) => {
            if (char == '"' || char == '\\') {
                encoded.push('\\');
            }
            encoded.push(char);
        });
        encoded.push('"');
        encodedChars += encoded.length;
    });

    const answer = encodedChars - originalChars;
    return { value: answer };
}
