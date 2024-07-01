// Coerce values to string and concatenate
export default function generateKey(val1, val2, delim = '.') {
    return `${val1}${delim}${val2}`;
}
