// TODO Deprecate this and move usages to queue.js
/**
 * Inserts a given state object into the correct place in an array of states sorted by weight ascending.
 * @param {*} queue
 * @param {*} state
 * @param {*} weightVariableName
 */
export function insertIntoSortedQueue(queue, state, weightVariableName) {
    let low = 0;
    let high = queue.length;

    while (low < high) {
        let mid = (low + high) >>> 1;

        if (queue[mid][weightVariableName] < state[weightVariableName]) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    queue.splice(low, 0, state);
}

export function insertIntoSortedQueueDesc(queue, state, weightVariableName) {
    let low = 0;
    let high = queue.length;

    while (low < high) {
        let mid = (low + high) >>> 1;

        if (queue[mid][weightVariableName] > state[weightVariableName]) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    queue.splice(low, 0, state);
}
