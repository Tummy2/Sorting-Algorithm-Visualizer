export const mergeSort = (array) => {
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
        const animation = {};
        animation.comparison = [i, j];
        if (helpArray[i] <= helpArray[j]) {
            animation.swap = [k, i];
            mainArray[k++] = helpArray[i++];
        } else {
            animation.swap = [k, j];
            mainArray[k++] = helpArray[j++]
        }
        animations.push(animation);
    }
    while (i <= middleIdx) {
        animations.push({
            comparison: [i, i],
            swap: [k, i],
        });
        mainArray[k++] = helpArray[i++];
    }
    while (j <= endIdx) {
        animations.push({
            comparison: [j, j],
            swap: [k, j],
        });
        mainArray[k++] = helpArray[j++];
    }
}

