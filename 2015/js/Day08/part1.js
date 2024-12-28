export default function solve({ lines, rawData }) {
    let totalChars = 0;
    let escaped = 0;

    lines.forEach((curr) => {
        totalChars += curr.length;
        curr = curr.substring(1, curr.length - 1);
        curr = curr.replaceAll(/(\\x(\d|[a-f]){2}|\\\"|\\\\)/g, '_');
        escaped += curr.length;
    });

    const answer = totalChars - escaped;
    return { value: answer };
}
