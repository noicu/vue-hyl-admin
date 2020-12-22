import { GetListParams, ResultList } from '../model/base';
import { Category, ProductID, ProductInfo, Api } from './model/product';
export * from './model/product';
import { defHttp } from '/@/utils/http/axios';
import { Result } from '/@/utils/http/axios/types';

/**
 * @description: 获取商品列表
 */
export function productInfoList(params: GetListParams<ProductInfo>) {
  return defHttp.request<ResultList<ProductInfo>>({
    url: Api.PRODUCT_PAGE,
    method: 'POST',
    params,
  });
}

/**
 * @description: 根据ID获取商品
 */
export function productInfo(params: ProductID) {
  return defHttp.request<ProductInfo>({
    url: Api.PRODUCT_GET,
    method: 'POST',
    params,
  });
}

/**
 * @description: 修改商品
 */
export function productCh(params: ProductInfo, id: string) {
  return defHttp.request<Result<ProductInfo>>({
    url: Api.PRODUCT_CH,
    method: 'POST',
    params: {
      id_of_es: id,
      M: params,
    },
  });
}

/**
 * @description: 根据ID删除商品
 */
export function productRm(params: ProductID) {
  return defHttp.request<Result<ProductInfo>>({
    url: Api.PRODUCT_RM,
    method: 'POST',
    params,
  });
}

/**
 * @description: 获取商品分类列表
 */
export function productCategoryList() {
  return defHttp.request<Category[]>({
    url: Api.CATEGORY_LIST,
    method: 'POST',
    params: {},
  });
}

/**
 * @description: 修改商品分类
 */
export function categoryCh(params: Category, id: number) {
  return defHttp.request<string>({
    url: Api.CATEGORY_CH,
    method: 'POST',
    params: {
      id,
      M: params,
    },
  });
}

/**
 * @description: 添加商品分类
 */
export function categoryAdd(params: Category) {
  return defHttp.request<string>({
    url: Api.CATEGORY_ADD,
    method: 'POST',
    params,
  });
}

/**
 * @description: 删除商品分类
 */
export function categoryRm(id: number) {
  return defHttp.request<string>({
    url: Api.CATEGORY_RM,
    method: 'POST',
    params: {
      id,
    },
  });
}

/**
 * @description: 获取运营商商品列表
 */
export function bProductPage(params: GetListParams<ProductInfo>) {
  return defHttp.request<ResultList<ProductInfo>>({
    url: Api.BROKER_PRODUCT_PAGE,
    method: 'POST',
    params,
  });
}
