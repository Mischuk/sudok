import { CellNotes } from "../Home/Home.types";

export const toggleNum = (arr: CellNotes[], item: CellNotes) =>
  arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];

export const deepCopy = <T>(obj: Object): T => JSON.parse(JSON.stringify(obj));

export const deepCompare = (obj1: Object, obj2: Object) =>
  JSON.stringify(obj1) === JSON.stringify(obj2);

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
