/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
 const obj1 = {};
    for( const key in obj){
        obj1[obj[key]]=key;
    }
    return obj?obj1:undefined;
}
