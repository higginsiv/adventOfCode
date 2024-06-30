export default function solve({ lines, rawData }) {
    function sumMetadata(elements, numChildren, numMetadata) {
        let sum = 0;

        for (let i = 0; i < numChildren; i++) {
            sum += sumMetadata(elements, elements.pop(), elements.pop());
        }

        for (let i = 0; i < numMetadata; i++) {
            sum += elements.pop();
        }

        return sum;
    }

    let numbers = rawData.match(/\d+/g).map(Number).reverse();

    return { value: sumMetadata(numbers, numbers.pop(), numbers.pop()) };
}
