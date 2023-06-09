const deepCopy = (obj: Object) => JSON.parse(JSON.stringify(obj));

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { deepCopy, getRandomInt };
