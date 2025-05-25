/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    const sorted = [...arr];
    return sorted.sort(function (a, b) {
        let result = a.localeCompare(b, ['ru', 'en'], { sensitivity: 'base' });
        if (result === 0) {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        }
        return param === 'asc' ? result : -result;
    });
}