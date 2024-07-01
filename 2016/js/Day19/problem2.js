export default function solve({ lines, rawData }) {
    let n = Number(rawData);
    let idToElf = new Map();
    idToElf.set(1, { id: 1, next: null, prev: null });
    let head = { id: 1, next: null, prev: null };
    let current = head;

    for (let i = 2; i <= n; i++) {
        idToElf.set(i, { id: i, prev: idToElf.get(i - 1), next: null });
        current.next = idToElf.get(i);
        current = current.next;
        current.prev = idToElf.get(i - 1);
    }

    current.next = head;
    head.prev = current;
    let toDelete = idToElf.get(Math.floor((idToElf.size + 1) / 2));

    while (idToElf.size > 1) {
        toDelete.prev.next = toDelete.next;
        toDelete.next.prev = toDelete.prev;
        idToElf.delete(toDelete.id);

        toDelete = toDelete.next;
        if (idToElf.size % 2 === 0) {
            toDelete = toDelete.next;
        }
    }

    let answer = toDelete.id;
    return { value: answer };
}
