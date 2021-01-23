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
  BrokerInfoGet = '/yi/user/BrokerInfoGet', // 通过id获取代理信息

  /**
   * 用户信息
   */
  GetUser = '/yi/user/GetUser', // 获取当前登陆用户的信息
  GetUserPublic = '/yi/user/GetUser', // 获取用户公开的信息
  ChUserInfo = '/yi/user/ChUserInfo', // 修改用户信息
  ChUserPwd = '/yi/user/ChUserPwd', // 修改用户密码

  /**
   * 平台闪段贴标准
   */
  PriceLevelVieList = '/yi/user/PriceLevelVieList', // 列表
  PriceLevelVieAdd = '/yi/user/PriceLevelVieAdd', // 新增
  PriceLevelVieCh = '/yi/user/PriceLevelVieCh', // 修改
  PriceLevelVieRm = '/yi/user/PriceLevelVieRm', // 删除

  /**
   * 平台悬赏贴标准
   */
  PriceLevelPrizeList = '/yi/user/PriceLevelPrizeList', // 列表
  PriceLevelPrizeAdd = '/yi/user/PriceLevelPrizeAdd', // 新增
  PriceLevelPrizeCh = '/yi/user/PriceLevelPrizeCh', // 修改
  PriceLevelPrizeRm = '/yi/user/PriceLevelPrizeRm', // 删除

  /**
   * 运营商闪段贴标准
   */
  BrokerPriceLevelVieList = '/yi/user/BrokerPriceLevelVieList', // 列表
  BrokerPriceLevelVieAdd = '/yi/user/BrokerPriceLevelVieAdd', // 新增
  BrokerPriceLevelVieCh = '/yi/user/BrokerPriceLevelVieCh', // 修改
  BrokerPriceLevelVieSetEnabled = '/yi/user/BrokerPriceLevelVieSetEnabled', // 启用/禁用

  /**
   * 运营商悬赏贴标准
   */
  BrokerPriceLevelPrizeList = '/yi/user/BrokerPriceLevelPrizeList', // 列表
  BrokerPriceLevelPrizeAdd = '/yi/user/BrokerPriceLevelPrizeAdd', // 新增
  BrokerPriceLevelPrizeCh = '/yi/user/BrokerPriceLevelPrizeCh', // 修改
  BrokerPriceLevelPrizeSetEnabled = '/yi/user/BrokerPriceLevelPrizeSetEnabled', // 启用/禁用
}

/**
 * @description: 根据ID获取运营商信息
 */
export function brokerInfoGet(broker_id: number) {
  return defHttp.request<any>({
    url: UserApi.BrokerInfoGet,
    method: 'POST',
    params: {
      broker_id,
    },
  });
}

/**
 * @description: 商品启用/禁用
 */
export function productSetEnabled(params: any) {
  return defHttp.request<any>({
    url: UserApi.ProductSetEnabled,
    method: 'POST',
    params,
  });
}

//-------------------------------------------------------------------------------

/**
 * @description: 平台闪段贴标准
 */
export function priceLevelVieList(params: any) {
  return defHttp.request<any>({
    url: UserApi.PriceLevelVieList,
    method: 'POST',
    params,
  });
}

/**
 * @description: 平台闪段贴标准
 */
export function priceLevelVieAdd(params: any) {
  return defHttp.request<any>({
    url: UserApi.PriceLevelVieAdd,
    method: 'POST',
    params,
  });
}

/**
 * @description: 平台闪段贴标准
 */
export function priceLevelVieCh(params: any) {
  return defHttp.request<any>({
    url: UserApi.PriceLevelVieCh,
    method: 'POST',
    params,
  });
}

/**
 * @description: 平台闪段贴标准
 */
export function priceLevelVieRm(params: any) {
  return defHttp.request<any>({
    url: UserApi.PriceLevelVieRm,
    method: 'POST',
    params,
  });
}

/**
 * @description: 平台悬赏贴标准
 */
export function priceLevelPrizeList(params: any) {
  return defHttp.request<any>({
    url: UserApi.PriceLevelPrizeList,
    method: 'POST',
    params,
  });
}

/**
 * @description: 平台悬赏贴标准
 */
export function priceLevelPrizeAdd(params: any) {
  return defHttp.request<any>({
    url: UserApi.PriceLevelPrizeAdd,
    method: 'POST',
    params,
  });
}

/**
 * @description: 平台悬赏贴标准
 */
export function priceLevelPrizeCh(params: any) {
  return defHttp.request<any>({
    url: UserApi.PriceLevelPrizeCh,
    method: 'POST',
    params,
  });
}

/**
 * @description: 平台悬赏贴标准
 */
export function priceLevelPrizeRm(params: any) {
  return defHttp.request<any>({
    url: UserApi.PriceLevelPrizeRm,
    method: 'POST',
    params,
  });
}

//-------------------------------------------------------------------------------

/**
 * @description: 运营商闪段贴标准
 */
export function brokerPriceLevelVieList(params: any) {
  return defHttp.request<any>({
    url: UserApi.BrokerPriceLevelVieList,
    method: 'POST',
    params,
  });
}

/**
 * @description: 运营商闪段贴标准
 */
export function brokerPriceLevelVieAdd(params: any) {
  return defHttp.request<any>({
    url: UserApi.BrokerPriceLevelVieAdd,
    method: 'POST',
    params,
  });
}

/**
 * @description: 运营商闪段贴标准
 */
export function brokerPriceLevelVieCh(params: any) {
  return defHttp.request<any>({
    url: UserApi.BrokerPriceLevelVieCh,
    method: 'POST',
    params,
  });
}

/**
 * @description: 运营商闪段贴标准
 */
export function brokerPriceLevelVieSetEnabled(params: any) {
  return defHttp.request<any>({
    url: UserApi.BrokerPriceLevelVieSetEnabled,
    method: 'POST',
    params,
  });
}

/**
 * @description: 运营商悬赏贴标准
 */
export function brokerPriceLevelPrizeList(params: any) {
  return defHttp.request<any>({
    url: UserApi.BrokerPriceLevelPrizeList,
    method: 'POST',
    params,
  });
}

/**
 * @description: 运营商悬赏贴标准
 */
export function brokerPriceLevelPrizeAdd(params: any) {
  return defHttp.request<any>({
    url: UserApi.BrokerPriceLevelPrizeAdd,
    method: 'POST',
    params,
  });
}

/**
 * @description: 运营商悬赏贴标准
 */
export function brokerPriceLevelPrizeCh(params: any) {
  return defHttp.request<any>({
    url: UserApi.PriceLevelPrizeCh,
    method: 'POST',
    params,
  });
}

/**
 * @description: 运营商悬赏贴标准
 */
export function brokerPriceLevelPrizeSetEnabled(params: any) {
  return defHttp.request<any>({
    url: UserApi.BrokerPriceLevelPrizeSetEnabled,
    method: 'POST',
    params,
  });
}

//-------------------------------------------------------------------------------

/**
 * @description: 统计用户注册数据
 */
export function regUserStats(params: any) {
  return defHttp.request<any>({
    url: UserApi.RegUserStats,
    method: 'POST',
    params,
  });
}

/**
 * @description: 统计大师注册数据
 */
export function regMasterStats(params: any) {
  return defHttp.request<any>({
    url: UserApi.RegMasterStats,
    method: 'POST',
    params,
  });
}

/**
 * @description: 新增运营商管理员
 */
export function brokerAdminAdd(params: any) {
  return defHttp.request<any>({
    url: UserApi.BrokerAdminAdd,
    method: 'POST',
    params,
  });
}

/**
 * @description: 运营商用户
 */
export function brokerUserInfoPage(params: any) {
  return defHttp.request<any>({
    url: UserApi.BrokerUserInfoPage,
    method: 'POST',
    params,
  });
}

/**
 * @description: 转为大师
 */
export function switchToMaster(params: any) {
  return defHttp.request<any>({
    url: UserApi.SwitchToMaster,
    method: 'POST',
    params,
  });
}

/**
 * @description: 转为运营商
 */
export function switchToBroker(params: any) {
  return defHttp.request<any>({
    url: UserApi.SwitchToBroker,
    method: 'POST',
    params,
  });
}

/**
 * @description: 大师申请
 */
export function masterInfoApplyPage(params: any) {
  return defHttp.request<any>({
    url: UserApi.MasterInfoApplyPage,
    method: 'POST',
    params,
  });
}

/**
 * @description: 大师申请审批
 */
export function masterInfoApplyAudit(params: any) {
  return defHttp.request<any>({
    url: UserApi.MasterInfoApplyAudit,
    method: 'POST',
    params,
  });
}

/**
 * @description: 运营商申请
 */
export function BrokerApplyPage(params: any) {
  return defHttp.request<any>({
    url: UserApi.BrokerApplyPage,
    method: 'POST',
    params,
  });
}

/**
 * @description: 运营商申请审批
 */
export function BrokerApplyAudit(params: any) {
  return defHttp.request<any>({
    url: UserApi.BrokerApplyAudit,
    method: 'POST',
    params,
  });
}

/**
 * @description: 修改用户密码
 */
export function chUserPwd(params: any) {
  return defHttp.request<any>({
    url: UserApi.ChUserPwd,
    method: 'POST',
    params,
  });
}

/**
 * @description: 获取当前登陆用户的信息
 */
export function getUser() {
  return defHttp.request<any>({
    url: UserApi.GetUser,
    method: 'POST',
    params: {},
  });
}

/**
 * @description: 修改用户信息
 */
export function setUser(params: any) {
  return defHttp.request<any>({
    url: UserApi.ChUserInfo,
    method: 'POST',
    params,
  });
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
 * @description: 添加系统管理员
 */
export function sysAdminAdd(uid: number) {
  return defHttp.request<boolean>({
    url: UserApi.SysAdminAdd,
    method: 'POST',
    params: {
      uid,
    },
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
