/**
 * @description 把数值转换为布尔值
 */
export const nToB = (n: any): boolean => (n > 0 ? true : false);

/**
 * @description 把布尔值转换为数值
 */
export const bToN = (n: boolean): number => (n ? 1 : 0);

/**
 * @description 把数值转换为0或1的反向
 */
export const reN = (n: number): 0 | 1 => (n > 0 ? 0 : 1);
