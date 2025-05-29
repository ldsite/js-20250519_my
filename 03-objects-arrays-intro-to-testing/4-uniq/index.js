
/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
    if (Array.isArray(arr)) {
        if (arr.length > 0) {
            return Array.from(new Set(arr));
        } else {
            return [];
        }
    }else {
        return [];
    }

}
