if (require) {
    require('./Common_stuff.js');
}

Array.prototype.bubbleSort = function (comparator) {
    const arr = [...this];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++) {
            if (comparator(arr[j], arr[i])) {
                let temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
            }
        }
    }
    return arr;
}

Array.prototype.insertionSort = function (comparator) {
    const arr = [...this];
    let key = 0;
    let i = 0;
    for (let j = 1; j < arr.length; j++) {
        key = arr[j];
        i = j - 1;
        while (i >= 0 && comparator(key, arr[i])) {
            arr[i + 1] = arr[i];
            arr[i] = key;
            i--;
        }
    }
    return arr;
}

Array.prototype.quickSort = function (comparator) {
    if ([0, 1].includes(this.length)) {
        return [...this];
    }

    const index = Math.round(this.length / 2);
    const pivot = this[index];
    let left = [];
    let right = [];
    for (let i = 0; i < this.length; i++) {
        if (index === i) {
            continue;
        }
        if (comparator(pivot, this[i])) {
            right.push(this[i])
        }
        else {
            left.push(this[i])
        }
    }

    left = left.quickSort(comparator);
    right = right.quickSort(comparator);

    const result = [];
    for (let i = 0, l = 0, r = 0; i < this.length; i++) {
        if (left.length === l && l === i) {
            result.push(pivot)
        }
        else if (l < left.length) {
            result.push(left[l++])
        }
        else {
            result.push(right[r++])
        }
    }
    return result;
}

const arr = [6, 3, 2, 7, 8, 6, 2, 1, 9, 12, 16, 20, 11, 10, 19, 17]

let numberOfCompairsons = 0;
function comparer(a, b) {
    numberOfCompairsons++
    return a < b
}

console.log(arr.bubbleSort(comparer));
console.log(`Bubble sort of array ${arr.join()} needed ${numberOfCompairsons} compares.`);

numberOfCompairsons = 0;
console.log(arr.insertionSort(comparer));
console.log(`Insertion sort of array ${arr.join()} needed ${numberOfCompairsons} compares`)

numberOfCompairsons = 0;
console.log(arr.quickSort(comparer));
console.log(`Quick sort of array ${arr.join()} needed ${numberOfCompairsons} compares`);
