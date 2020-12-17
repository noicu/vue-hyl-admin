import { GetListParams, ResultList } from '../model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { Result } from '/@/utils/http/axios/types';

enum Api {
  CATEGORY_LIST = '/yi/user/CategoryList', // 获取商品分类列表------B+S
  CATEGORY_GET = '/yi/user/CategoryGet', // 根据id获取商品分类------B+S
  CATEGORY_ADD = '/yi/user/CategoryAdd', // 新增商品分类------S
  CATEGORY_CH = '/yi/user/CategoryCh', // 修改商品分类------S
  CATEGORY_RM = '/yi/user/CategoryRm', // 移除商品分类------S
  PRODUCT_PAGE = '/yi/user/ProductPage', // 查询商品--分页
  PRODUCT_GET = '/yi/user/ProductGet', // 通过id获取商品----B+S
  PRODUCT_ADD = '/yi/user/ProductAdd', // 新增商品信息------S
  PRODUCT_CH = '/yi/user/ProductCh', // 修改商品信息------S
  PRODUCT_RM = '/yi/user/ProductRm', // 通过id删除商品------S
}

export interface ProductColor {
  code: string;
  price: number;
}
export interface ProductImage {
  path: string;
  sort_no: number;
}

export interface ProductInfo {
  cate_id: number;
  cate_name: string;
  colors: ProductColor[];
  created: string;
  enabled: true;
  id_of_es: string;
  image_main: string;
  images: ProductImage[];
  key_word: string;
  last_updated: string;
  name: string;
  remark: string;
  visit_count: number;
}

export interface ProductID {
  id_of_es: string;
}

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
  return defHttp.request<Result<ProductInfo>>({
    url: Api.PRODUCT_GET,
    method: 'POST',
    params,
  });
}
