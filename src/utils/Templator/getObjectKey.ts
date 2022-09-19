/* eslint no-restricted-syntax: 0 */

export function getObjectKey(obj:{[key:string]:any}, path:string, defaultValue = 'undefined') {
  const keys = path.split('.');
  let result = { ...obj };


  for (const key of keys) {
    if (!result) {
      return defaultValue;
    }
    result = result[key];

    if (result === undefined) {
      return defaultValue;
    }
  }
 
  return result ?? defaultValue;
}
