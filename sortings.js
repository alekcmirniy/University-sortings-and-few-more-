function checkTimeDifference(sorting, array, ...params) {
    const runs = 3;
    let total = 0;
    for (let i = 0; i < runs; i++) {
        const startTime = performance.now();
        sorting([...array], ...params);
        const endTime = performance.now();
        total += (endTime - startTime);
    }
    return (`Time gap - ${(total / runs).toFixed(3)} ms an average from ${runs} tests`);
}

const array = Array.from({length: 100000}, () => Math.floor(Math.random() * 100000));
console.log(`For an array with length of ${array.length}: Counting... `);

//bubble sort
function bubbleSort(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
    }
    return array;
}
console.log("Bubble: ", checkTimeDifference(bubbleSort, array));

//selection sort
function selectionSort(array) {
    let count = 0;
    while (count < array.length) {
        let max = Math.max(...array.slice(0, array.length - count));
        for (let i = 0; i < array.length - count; i++) {
            if (array[i] === max) {
                [array[array.length - count - 1], array[i]] = [array[i], array[array.length - count - 1]];
            }
        }
        count++;
    }
}
console.log("Selection: ", checkTimeDifference(selectionSort, array));

//hairbrush sort
function hairbrushSort(array) {
    const optimal = 1.27;
    const l = array.length;
    let gap = l / optimal;
    while (gap > 1) {
        const gapFixed = Math.round(gap);
        for (let i = 0, j = gapFixed; j < l; i++, j++) {
            if (array[i] > array[j]) {
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        gap = gap / optimal;
    }
    return array;
}
console.log("Hairbrush: ", checkTimeDifference(hairbrushSort, array));

//quick sort
function quickSort(array) {
    if (array.length < 2) return array;
    const sup = array[Math.floor(array.length / 2)];
    const aLeft = [];
    const aRight = [];
    for (let i = 0; i < array.length; i++) {
        if (Math.floor(array.length / 2) === i) continue;
        sup > array[i] ? aLeft.push(array[i]) : aRight.push(array[i]);
    }
    return quickSort(aLeft).concat(sup, quickSort(aRight));
}
console.log("Quick: ", checkTimeDifference(quickSort, array));

//merge sort
function mergeSort(array) {
    
    function merge(arr1, arr2) {
        const result = [];
        let i1 = 0, i2 = 0;
        while (i1 < arr1.length && i2 < arr2.length) {
            if (arr1[i1] > arr2[i2]) {
                result.push(arr2[i2]);
                i2++;
            }
            else {
                result.push(arr1[i1]);
                i1++;
            }
        }
        return result.concat(arr1.slice(i1)).concat(arr2.slice(i2));
    };

    if (array.length < 2) return array;

    const medIdx = Math.floor(array.length / 2);
    const left = array.slice(0, medIdx);
    const right = array.slice(medIdx);
    
    return merge(mergeSort(left), mergeSort(right));
}
console.log("Merge: ", checkTimeDifference(mergeSort, array));

//counting sort
function countingSort(array, min, max) {
    let i = min, j = 0, len = array.length, additional = [];
    const result = [];
    for (i; i<= max; i++) { additional[i] = 0; }

    for (i = 0; i < len; i++) {
        additional[array[i]]++;
    }
    for (i = min; i <= max; i++) {
        while (additional[i] > 0) {
            result[j] = i;
            j++;
            additional[i]--;
        }
    }
    return result;
}
console.log("Counting: ", checkTimeDifference(countingSort, array, 0, 100000));

//heap sort
function heapSort(arr) {
    const n = arr.length;
    function doHeap(arr, n, i) {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        
        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            doHeap(arr, n, largest);
        }
    }

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        doHeap(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], array[0]];
        doHeap(arr, i, 0);
    }
    return arr;
}

console.log("Heap: ", checkTimeDifference(heapSort, array));

//radix sort
function radixSort(array) {
    const maxDischarge = Math.max(...array).toString().length;
    for (let i = 0; i < maxDischarge; i++) {
        const intermediateArr = Array.from({length: 10}, () => []);
        array.forEach((item) => {
            let discharge = Math.floor(item / Math.pow(10, i)) % 10;
            intermediateArr[discharge].push(item);
        });
        array = intermediateArr.flat();
    }
    return array;
}
console.log("Radix: ", checkTimeDifference(radixSort, array));