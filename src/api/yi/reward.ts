import { Api, PriceLevel } from './model/reward';
export * from './model/reward';
import { defHttp } from '/@/utils/http/axios';

/**
 * @description: 平台闪断贴标准列表
 */
export function priceLevelVieList() {
  return defHttp.request<PriceLevel[]>({
    url: Api.PRICE_LEVEL_VIE_LIST,
    method: 'POST',
  });
}

/**
 * @description: 平台悬赏贴标准列表
 */
export function priceLevelPrizeList() {
  return defHttp.request<PriceLevel[]>({
    url: Api.PRICE_LEVEL_PRIZE_LIST,
    method: 'POST',
  });
}
