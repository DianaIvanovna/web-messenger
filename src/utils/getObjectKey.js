export function getObjectKey(obj, path, defaultValue = undefined) {
  let keys = path.split('.');
  let result = obj;
  for (let key of keys) {
    result = result[key];

    if (result === undefined) {
      return defaultValue;
    }
  }

  return result ?? defaultValue;
}
