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

/*
  TODOS: Мутировать значение по ссылке, не очень хорошая практика. Лучше создать новый объект с новыми данными и вернуть его. Статья на эту тему https://habr.com/ru/company/ruvds/blog/346998/
*/

// const namespace = (str: string): object =>
//   str.split(".").reduceRight((acc, key) => ({ [key]: acc }), {});
