if(require) {
    require('./Common_stuff')
}

function binnarySearch({
    array, left, right, searchingValue, comparator
}) {
    if (right < left) {
        return -1;
    }
    const middle = Math.round(left + (right - left) / 2);
//    middle.log()
    const compairResult = comparator(array[middle], searchingValue);
    if (compairResult === 0) {
        binnarySearch.params = undefined;
        return middle
    }
    if (!binnarySearch.params) {
        binnarySearch.params = {
            array, searchingValue, left, right, comparator
        }
    }
    if (compairResult > 0) {
        binnarySearch.params.right = middle - 1
    }
    else {
        binnarySearch.params.left = middle + 1
    }
    return binnarySearch(binnarySearch.params)
}

//export default function (array, comparator, searchingValue) {
//    return binnarySearch({
//        array,
//        left: 0,
//        right: arr.length - 1,
//        comparator,
//        searchingValue
//    })
//}
const array = [1,2,3,4,5,6,7,8,9];
binnarySearch({
    array,
    left: 0,
    right: array.length,
    comparator: (a, b) => a - b,
    searchingValue: 7
}).log()
