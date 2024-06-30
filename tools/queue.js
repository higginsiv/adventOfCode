export default class PriorityQueue {
    items;
    comparator;

    constructor(initial, comparator) {
        if (Array.isArray(initial)) {
            this.items = initial;
        } else {
            this.items = [initial];
        }

        this.comparator = comparator;
    }

    isNotEmpty() {
        return this.items.length > 0;
    }

    next() {
        return this.items.pop();
    }

    insert(item) {
        let low = 0;
        let high = this.items.length;

        while (low < high) {
            let mid = (low + high) >>> 1;

            // insert in reverse order because pop() is O(1) and shift() is O(n)
            if (this.comparator(this.items[mid], item) < 0) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }

        this.items.splice(low, 0, item);
    }
}
