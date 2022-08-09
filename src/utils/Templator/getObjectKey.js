/* eslint no-restricted-syntax: 0 */

export function getObjectKey(obj, path, defaultValue = undefined) {
  const keys = path.split('.');
  let result = { ...obj };

  for (const key of keys) {
    result = result[key];

    if (result === undefined) {
      return defaultValue;
    }
  }

  return result ?? defaultValue;
}
