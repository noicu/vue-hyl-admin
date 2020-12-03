import { FiltersConfig } from "./types";

export function findKey(source: Array<FiltersConfig>, search: any): FiltersConfig {
  let obj: any = null;
  for (let i = 0; i < source.length; i++) {
    if (source[i].key_text == search || source[i].key == search) {
      obj = source[i];
      break;
    }
  }
  return obj;
}
