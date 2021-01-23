export enum Api {
  CATEGORY_LIST = '/yi/user/CategoryList', // 获取商品分类列表------B+S
  CATEGORY_GET = '/yi/user/CategoryGet', // 根据id获取商品分类------B+S
  CATEGORY_ADD = '/yi/user/CategoryAdd', // 新增商品分类------S
  CATEGORY_CH = '/yi/user/CategoryCh', // 修改商品分类------S
  CATEGORY_RM = '/yi/user/CategoryRm', // 移除商品分类------S
  PRODUCT_PAGE = '/yi/user/ProductPage', // 查询商品--分页
  PRODUCT_GET = '/yi/user/ProductGet', // 通过id获取商品----B+S
  PRODUCT_ADD = '/yi/user/ProductAdd', // 新增商品信息------S
  PRODUCT_CH = '/yi/user/ProductCh', // 修改商品信息------S
  PRODUCT_SET_ENABLED = '/yi/user/ProductSetEnabled', // 通过id启用或停用商品------S

  BROKER_CATE_ADD = '/yi/user/BrokerCateAdd', // 运营商商品类别批量增加
  BROKER_CATE_LIST = '/yi/user/BrokerCateList', // 运营商商品类别列表
  BROKER_CATE_RM = '/yi/user/BrokerCateRm', // 运营商商品类别批量删除------B+S

  BROKER_PRODUCT_ADD = '/yi/user/BrokerProductAdd', // 运营商商品批量添加-----B+S
  BROKER_PRODUCT_PAGE = '/yi/user/BrokerProductPage', // 运营商商品分页查询------B+S
  BROKER_PRODUCT_PRICE_CH = '/yi/user/BrokerProductPriceCh', // 运营商商品批量价格修改------B+S
  BROKER_PRODUCT_RM = '/yi/user/BrokerProductRm', // 运营商商品批量删除------B+S
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
  cate_id?: number;
  cate_name?: string;
  colors?: ProductColor[];
  created?: string;
  enabled?: boolean;
  id_of_es?: string;
  image_main?: string;
  images?: ProductImage[];
  key_word?: string;
  last_updated?: string;
  name?: string;
  remark?: string;
  visit_count?: number;
}

export interface ProductID {
  id_of_es: string;
}

export interface Category {
  icon?: string;
  id?: number;
  name?: string;
  sort_no?: number;
}
