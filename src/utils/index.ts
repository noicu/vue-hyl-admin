export const timestamp = () => +Date.now();
export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
export const noop = () => {};
export const now = () => Date.now();
/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  if (node) {
    return node.parentNode as HTMLElement;
  }
  return document.body;
}
/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  let url = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  if (/\?$/.test(baseUrl)) {
    url = baseUrl + parameters;
  } else {
    url = baseUrl.replace(/\/?$/, '?') + parameters;
  }
  return url;
}

export function deepMerge<T = any>(src: any, target: any): T {
  let key: string;
  for (key in target) {
    src[key] =
      src[key] && src[key].toString() === '[object Object]'
        ? deepMerge(src[key], target[key])
        : (src[key] = target[key]);
  }
  return src;
}

/**
 * @description: 根据数组中某个对象值去重
 */
export function unique<T = any>(arr: T[], key: string): T[] {
  const map = new Map();
  return arr.filter((item) => {
    const _item = item as any;
    return !map.has(_item[key]) && map.set(_item[key], 1);
  });
}

/**
 * @description: es6数组去重复
 */
export function es6Unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

/**
 * @description: 查询字符串出现的位置
 */
export function findPos(
  str: string,
  search: string,
  index: number = 0,
  arr: Array<[number, number]> = []
): Array<[number, number]> {
  index = str.indexOf(search, index);
  if (index !== -1) {
    arr.push([index, index + search.length]);
    return findPos(str, search, index + 1, arr);
  }
  console.log(index, arr);
  return arr;
}

export function generateMixed(n: number) {
  var chars = ['!', '@', '#', '$', '%', '^', '&', '(', ')'];
  var res = '';
  for (var i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * chars.length - 1);
    res += chars[id];
  }
  return res;
}
