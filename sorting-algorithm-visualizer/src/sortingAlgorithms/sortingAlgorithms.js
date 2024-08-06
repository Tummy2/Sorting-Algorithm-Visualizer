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
            // We overwrite the value at index k in the orgininal array with the
            // value at index j in the help array
            animations.push([k, helpArray[j]]);
            mainArray[k++] = helpArray[j++];
        }
    }
    while (i <= middleIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color
        animations.push([i, i]);
        // These aare the values that we're comparing; we push them a second
        // time to rever their color
        animations.push([i, i]);
        // We overwrite the value at indeex k in the original array with the
        // value at index i in the help array
        animations.push([k, helpArray[i]]);
        mainArray[k++] = helpArray[i++];
    }
    while (j <= endIdx) {
        // These aare the values that we're comparing; we push them a second
        // time to rever their color
        animations.push([j, j]);
        // These aare the values that we're comparing; we push them a second
        // time to rever their color
        animations.push([j, j]);
        // We overwrite the value at indeex k in the original array with the
        // value at index i in the help array
        animations.push([k, helpArray[j]]);
        mainArray[k++] = helpArray[j++];
    }
}

