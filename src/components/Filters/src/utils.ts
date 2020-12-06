import { FiltersConfig } from "./types";

export function findKey(source: Array<FiltersConfig>, search: any): FiltersConfig {
  let obj: any = null;
  for (let i = 0; i < source.length; i++) {
    if (source[i].label == search || source[i].field == search) {
      obj = source[i];
      break;
    }
  }
  return obj;
}
