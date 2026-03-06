function mergeSort(arr) {
    const mergedArray = []
    if (arr.length <= 1) {
        return arr;
    } else {
        const leftSorted = mergeSort(arr.slice(0, Math.ceil(arr.length / 2)));
        const rightSorted = mergeSort(arr.slice(Math.ceil(arr.length / 2), arr.length));

        while (leftSorted.length > 0 && rightSorted.length > 0) {
            if (leftSorted.at(0) <= rightSorted.at(0)) {
                mergedArray.push(leftSorted.shift());
            } else {
                mergedArray.push(rightSorted.shift());
            };
        };

        if (rightSorted.length === 0)
            mergedArray.push(...leftSorted);
        else if (leftSorted.length === 0)
            mergedArray.push(...rightSorted);

        return mergedArray;
    }
    
}
console.log(mergeSort([]));
console.log(mergeSort([73]));
console.log(mergeSort([1, 2, 3, 4, 5]));
console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
console.log(mergeSort([105, 79, 100, 110]));