export enum Api {
  MASTER_INFO_PAGE = '/yi/user/MasterInfoPage', // 大师信息分页查询
  MASTER_INFO_FULL_GET = '/yi/user/MasterInfoFullGet', // 获取大师全部信息 详情
  MASTER_INFO_APPLY_PAGE = '/yi/user/MasterInfoApplyPage', // 大师申请分页查询
  MASTER_INFO_APPLY_AUDIT = '/yi/user/MasterInfoApplyAudit', // 审批大师申请
  MASTER_SET_ENABLE = '/yi/user/MasterSetEnable', // 启用或停用某大师

  B_MASTER_ADD = '/yi/user/BMasterAdd', // w运营商大师添加单个------B+S
  B_MASTER_ADD_BATCH = '/yi/user/BMasterAddBatch', // w运营商大师批量添加------B+S
  B_MASTER_INFO_FULL_GET = '/yi/user/BMasterInfoFullGet', // w运营商获取单个大师信息------B+S+U
  B_M_I_PRICE_LIST = '/yi/user/BMIPriceList', // w运营商大师获取价格列表------B+S
  B_MASTER_PAGE = '/yi/user/BMasterPage', // w运营商大师信息分页查询------U+B+S
  B_M_I_PRICE_CH_BATCH = '/yi/user/BMIPriceChBatch', // w运营商大师项目价格批量修改------B+S
  B_MASTER_RM = '/yi/user/BMasterRm', // w运营商大师删除------B+S

  MASTER_ADD = '/yi/user/MasterAdd', // 管理员直接添加大师------S

  MASTER_INFO_CH = '/yi/user/MasterInfoCh', // w大师信息更改------M+S
  MASTER_IMAGE_LIST = '/yi/user/MasterImageList', // w大师图片列表------M+B+U+S
  MASTER_IMAGE_ADD = '/yi/user/MasterImageAdd', // w大师图片添加------M+S
  MASTER_IMAGE_CH = '/yi/user/MasterImageCh', // w大师图片修改------M+S
  MASTER_IMAGE_RM = '/yi/user/MasterImageRm', // w大师图片删除------M+S
  MASTER_ITEM_LIST = '/yi/user/MasterItemList', // w大师项目列表------M+B+S
  MASTER_ITEM_ADD = '/yi/user/MasterItemAdd', // w大师项目增加------M+S
  MASTER_ITEM_ADD_BATCH = '/yi/user/MasterItemAddBatch', // 大师项目批量增加------M+S
  MASTER_ITEM_CH = '/yi/user/MasterItemCh', // w大师项目修改------M+S
  MASTER_ITEM_RM = '/yi/user/MasterItemRm', // w大师项目删除------M+S
}

export interface MasterInfo {
  bad_rate: number;
  best_rate: number;
  brief: string;
  created_at: string;
  enabled: number;
  icon: string;
  id: number;
  level: number;
  mid_rate: number;
  nick: string;
  order_total: number;
  rate: number;
  rebate: number;
  sign_date: string;
  uid: number;
  update_at: string;
  user_code: string;
  ver: number;
}

export interface BMasterInfo extends MasterInfo {
  broker_name: string;
  broker_id: number;
  master_id: number;
}

export interface MasterInfoFull {
  info: MasterInfo;
  images: Images;
  items: Items;
}

export interface Images {
  id: number;
  image_path: string;
  sort_no: number;
  uid: number;
}

export interface Items {
  comment: string;
  id: number;
  price: number;
  sort_no: number;
  uid: number;
  yi_cate_id: number;
  yi_cate_name: string;
}

export interface MasterUID {
  master_id: number;
}

export interface MasterCh extends MasterUID {
  enabled: number;
}
