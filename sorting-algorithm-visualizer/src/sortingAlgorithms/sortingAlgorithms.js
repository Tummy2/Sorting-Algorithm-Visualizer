// MERGE SORT ------------------------------------------------------------------------
export const mergeSortAnimations = (array) => {
    const animations = [];
    if (array.length <= 1) return array;
    const helpArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, helpArray, animations);
    return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, helpArray, animations) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(helpArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(helpArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, helpArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, helpArray, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        // These are values that we're comparing; we push them once
        // to change their color
        animations.push([i, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color
        animations.push([i, j]);
        if (helpArray[i] <= helpArray[j]) {
            // We overwrite the value at index k in the original array with the
            // value at index i in the help array
            animations.push([k, helpArray[i]]);
            mainArray[k++] = helpArray[i++];
        } else {
            // We overwrite the value at index k in the original array with the
            // value at index j in the help array
            animations.push([k, helpArray[j]]);
            mainArray[k++] = helpArray[j++];
        }
    }
    while (i <= middleIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color
        animations.push([i, i]);
        // These are the values that we're comparing; we push them a second
        // time to rever their color
        animations.push([i, i]);
        // We overwrite the value at index k in the original array with the
        // value at index i in the help array
        animations.push([k, helpArray[i]]);
        mainArray[k++] = helpArray[i++];
    }
    while (j <= endIdx) {
        // These are the values that we're comparing; we push them a second
        // time to revert their color
        animations.push([j, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color
        animations.push([j, j]);
        // We overwrite the value at index k in the original array with the
        // value at index i in the help array
        animations.push([k, helpArray[j]]);
        mainArray[k++] = helpArray[j++];
    }
}


// QUICK SORT ------------------------------------------------------------------------
export const quickSortAnimations = (array) => {
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations
}

function quickSortHelper(array, low, high, animations) {
    if (low < high) {
        const pivotIndex = partition(array, low, high, animations);
        quickSortHelper(array, low, pivotIndex - 1, animations);
        quickSortHelper(array, pivotIndex + 1, high, animations)
    }
}

function partition(array, low, high, animations) {
    const pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        // Comparison
        animations.push([j, high, "red"]);
        animations.push([j, high, "turquoise"]);
        if (array[j] <= pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            // Swap
            animations.push([i, array[i], "swap"]);
            animations.push([j, array[j], "swap"]);
        }
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    // Swapping pivot
    animations.push([i + 1, array[i + 1], "swap"]);
    animations.push([high, array[high], "swap"]);
    return i + 1;
}


// HEAP SORT ------------------------------------------------------------------------
export const heapSortAnimations = (array) => {
    const animations = [];
    let n = array.length;
    // Build max heap
    for (let i = Math.floor(n/2) - 1; i >= 0; i--) {
        heapify(array, n, i, animations);
    }
    // One by one extract elements from the heap
    for (let i = n -1; i > 0; i--) {
        // Move current root to the end
        animations.push([0, i, "red"]);
        animations.push([0, i, "turquoise"]);

        [array[0], array[i]] = [array[i], array[0]];

        // Swap animation for root
        animations.push([0, array[0], "swap"]); 
        animations.push([i, array[i], "swap"]);

        // Call heapify on the reduced heap
        heapify(array, i, 0, animations);
    } return animations;
}

function heapify(array, n, i, animations) {
    // Largest is the root
    let largest = i;
    // Left child
    let left = 2 * i + 1;
    // Right child
    let right = 2 * i + 2;

    // If left child is larger than root
    if (left < n) {
        animations.push([largest, left, "red"]);
        animations.push([largest, left, "turquoise"]);
        if (array[left] > array[largest]) {
            largest = left;
        }
    }

    // If right child is larger than largest so far
    if (right < n) {
        animations.push([largest, right, "red"]);
        animations.push([largest, right, "turquoise"]);
        if (array[right] > array[largest]) {
            largest = right;
        }
    }

    // If largest is not root
    if (largest !== i) {
        // Swap
        [array[i], array[largest]] = [array[largest], array[i]];
        // Swap animations
        animations.push([i, array[i], "swap"]);
        animations.push([largest, array[largest], "swap"]);
        // Recursively call it 
        heapify(array, n, largest, animations);
    }
    return;
}


// BUBBLE SORT ------------------------------------------------------------------------
export const bubbleSortAnimations = (array) => {
    const animations = [];
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < array.length - 1; i++) {
            // Record the comparison
            animations.push([i, i + 1]);
            animations.push([i, i + 1]);
            if (array[i] > array[i + 1]) {
                // Swap the elements 
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapped = true;
                // Record the swap
                animations.push([i, array[i]]);
                animations.push([i + 1, array[i + 1]]);
            } else {
                // Record no swap
                animations.push([i, array[i]]);
                animations.push([i + 1, array[i + 1]]);
            }
        }
    } while (swapped);
    return animations;
}

