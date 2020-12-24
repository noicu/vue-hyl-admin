import { defHttp } from '/@/utils/http/axios';
import { GetListParams, ResultList } from './model/base';
import { EnabledUser, UID } from './model/user';
import { AdminInfo } from './model/admin';

export enum UserApi {
  /**
   * 平台管理员
   */
  SysAdminPage = '/yi/user/SysAdminPage', // 列表
  SysAdminAdd = '/yi/user/SysAdminAdd', // 新增
  SysAdminRm = '/yi/user/SysAdminRm', // 删除
  SysAdminCh = '/yi/user/SysAdminCh', // 启用/禁用

  /**
   * 运营商管理员
   */
  BrokerAdminList = '/yi/user/BrokerAdminList', // 列表
  BrokerAdminAdd = '/yi/user/BrokerAdminAdd', // 新增
  BrokerAdminRm = '/yi/user/BrokerAdminRm', // 删除

  /**
   * 平台大师
   */
  MasterInfoPage = '/yi/user/MasterInfoPage', // 列表
  MasterInfoFullGet = '/yi/user/MasterInfoFullGet', // 详情
  MasterSetEnable = '/yi/user/MasterSetEnable', // 启用/禁用

  /**
   * 运营商大师
   */
  BMasterPage = '/yi/user/BMasterPage', // 列表
  BMasterAddBatch = '/yi/user/BMasterAddBatch', // 添加
  BMasterRm = '/yi/user/BMasterRm', // 删除
  BMIPriceList = '/yi/user/BMIPriceList', // 获取价格
  BMIPriceChBatch = '/yi/user/BMIPriceChBatch', // 修改价格

  /**
   * 平台商城
   */
  ProductPage = '/yi/user/ProductPage', // 商品-列表
  ProductAdd = '/yi/user/ProductAdd', // 商品-新增
  ProductCh = '/yi/user/ProductCh', // 商品-修改
  ProductSetEnabled = '/yi/user/ProductSetEnabled', // 商品-启用/禁用
  CategoryList = '/yi/user/CategoryList', // 分类-列表
  CategoryAdd = '/yi/user/CategoryAdd', // 分类-新增
  CategoryCh = '/yi/user/CategoryCh', // 分类-修改
  CategoryRm = '/yi/user/CategoryRm', // 分类-删除

  /**
   * 运营商商城
   */
  BrokerProductPage = '/yi/user/BrokerProductPage', // 商品-列表
  BrokerProductAdd = '/yi/user/BrokerProductAdd', // 商品-添加
  BrokerProductPriceCh = '/yi/user/BrokerProductPriceCh', // 商品-修改价格
  BrokerProductRm = '/yi/user/BrokerProductRm', // 商品-删除
  BrokerCateList = '/yi/user/BrokerCateList', // 分类-列表
  BrokerCateAdd = '/yi/user/BrokerCateAdd', // 分类-添加
  BrokerCateRm = '/yi/user/BrokerCateRm', // 分类-删除

  /**
   * 统计
   */
  RegUserStats = '/yi/user/RegUserStats', // 统计用户注册数据
  RegMasterStats = '/yi/user/RegMasterStats', // 统计大师注册数据

  /**
   * 运营商用户
   */
  BrokerUserInfoPage = '/yi/user/BrokerUserInfoPage', // 列表
  SwitchToMaster = '/yi/user/SwitchToMaster', // 转为大师
  SwitchToBroker = '/yi/user/SwitchToBroker', // 转为运营商

  /**
   * 大师申请
   */
  MasterInfoApplyPage = '/yi/user/MasterInfoApplyPage', // 列表
  MasterInfoApplyAudit = '/yi/user/MasterInfoApplyAudit', // 审批

  /**
   * 运营商申请
   */
  BrokerApplyPage = '/yi/user/BrokerApplyPage', // 列表
  BrokerApplyAudit = '/yi/user/BrokerApplyAudit', // 审批

  /**
   * 平台运营商
   */
  BrokerInfoPage = '/yi/user/BrokerInfoPage', // 列表
  BrokerSetEnable = '/yi/user/BrokerSetEnable', // 启用/禁用
}

/**
 * @description: 获取系统管理员列表
 */
export function sysAdminPage(params: GetListParams<AdminInfo>) {
  return defHttp.request<ResultList<AdminInfo>>({
    url: UserApi.SysAdminPage,
    method: 'POST',
    params,
  });
}

/**
 * @description: 禁用/启用系统管理员
 */
export function sysAdminCh(params: EnabledUser) {
  return defHttp.request<boolean>({
    url: UserApi.SysAdminCh,
    method: 'POST',
    params,
  });
}

/**
 * @description: 删除系统管理员
 */
export function sysAdminRm(params: UID) {
  return defHttp.request<boolean>({
    url: UserApi.SysAdminRm,
    method: 'POST',
    params,
  });
}

/**
 * @description: 获取运营商管理员列表
 */
export function brokerAdminList() {
  return defHttp.request<[]>({
    url: UserApi.BrokerAdminList,
    method: 'POST',
    params: {},
  });
}

/**
 * @description: 删除运营商管理员
 */
export function brokerAdminRm(params: UID) {
  return defHttp.request<boolean>({
    url: UserApi.BrokerAdminRm,
    method: 'POST',
    params,
  });
}
