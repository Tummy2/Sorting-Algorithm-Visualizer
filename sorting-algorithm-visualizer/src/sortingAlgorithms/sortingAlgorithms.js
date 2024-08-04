export const mergeSort = (array, startIdx, endIdx, animations = []) => {
    if (startIdx === endIdx) return array;
    const middleIdx = Math.floor(endIdx + 1 - startIdx);
    const firstHalf = mergeSort(array, startIdx, middleIdx, animations);
    const secondHalf = mergeSort(array, middleIdx + 1, endIdx, animations);
    const sortedArray = [];
    let i = 0,
        j = 0;
    while (i < firstHalf.length && j < secondHalf.length) {
        if (firstHalf[i] < secondHalf[j]) {
            sortedArray.push(firstHalf[i++]);
        } else {
            sortedArray.push(secondHalf[j++])
        }
    }
    while (i < firstHalf.length) sortedArray.push(firstHalf[i++]);
    while (j < secondHalf.length) sortedArray.push(secondHalf[j++]);
    return sortedArray
};
