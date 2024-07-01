export default function solve({ lines, rawData }) {
    function sumMetadata(elements, numChildren, numMetadata) {
        let sum = 0;

        if (numChildren === 0) {
            for (let i = 0; i < numMetadata; i++) {
                sum += elements.pop();
            }
            return sum;
        }

        let childSums = [];
        for (let i = 0; i < numChildren; i++) {
            childSums.push(sumMetadata(elements, elements.pop(), elements.pop()));
        }

        for (let i = 0; i < numMetadata; i++) {
            let index = elements.pop() - 1;
            if (index >= 0 && index < childSums.length) {
                sum += childSums[index];
            }
        }
        return sum;
    }

    let numbers = rawData.match(/\d+/g).map(Number).reverse();

    return { value: sumMetadata(numbers, numbers.pop(), numbers.pop()) };
}
