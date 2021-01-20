import { FilterSchema } from './types';

export function findKey(source: Array<FilterSchema>, search: any): FilterSchema {
  let obj: any = null;
  for (let i = 0; i < source.length; i++) {
    if (source[i].label == search || source[i].field == search) {
      obj = source[i];
      break;
    }
  }
  return obj;
}
