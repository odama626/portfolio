export function getRandomColor() {
  let colorCode = Math.floor(Math.random() * 1000);

  return `#${colorCode < 100 ? colorCode + 100 : colorCode}`;
}

export function tryPull(obj, ...path) {
  let key = path.shift();
  if (obj && key && obj[key]) {
    let value = obj[key];
    if (path.length) {
      return tryPull(value, ...path);
    } else {
      return value;
    }
  }
  return null;
}