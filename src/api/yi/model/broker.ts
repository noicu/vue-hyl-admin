export enum Api {
  BROKER_ADMIN_LIST_URL = '/yi/user/BrokerAdminList', // 获取代理管理员列表
  BROKER_ADMIN_ADD_URL = '/yi/user/BrokerAdminAdd', // 新增代理管理
  BROKER_ADMIN_RM_URL = '/yi/user/BrokerAdminRm', // 删除代理管理员
  BROKER_APPLY_PAGE_URL = '/yi/user/BrokerApplyPage', // 代理申请信息分页查
  BROKER_APPLY_AUDIT_URL = '/yi/user/BrokerApplyAudit', // 运营商审
  BROKER_INFO_PAGE_URL = '/yi/user/BrokerInfoPage', // 运营商分页查
  BROKER_USER_INFO_PAGE_URL = '/yi/user/BrokerUserInfoPage', // 获取运营商所有的用户（包含本身及代理管理员）分页数据
  BROKER_IDGET_URL = '/yi/user/BrokerIDGet', // 根据服务代码获取代理id
  BROKER_INFO_GET_URL = '/yi/user/BrokerInfoGet', // 通过id获取代理信息
  BROKER_USER_INFO_SEARCH_URL = '/yi/user/BrokerUserInfoSearch', // 按代理id搜索用户信息
  SERVICE_CODE_BIND_URL = '/yi/user/ServiceCodeBind', // 服务代码绑定
  BROKER_SET_ENABLE = '/yi/user/BrokerSetEnable', // 启用停用代理-----S

  BROKER_MODULE_CH = '/yi/user/BrokerModuleCh', // 修改运营商模块
  BROKER_MODULE_LIST = '/yi/user/BrokerModuleList', // 获取运营商模块

  BROKER_ADD = '/yi/user/BrokerAdd', // 管理员直接添加运营商------S
}

export interface BrokerModules {
  enable_mall: number | boolean;
  enable_master: number | boolean;
  enable_prize: number | boolean;
  enable_vie: number | boolean;
}

export interface BrokerInfo extends BrokerModules {
  account_code: string;
  account_type: number;
  brief: string;
  created_at: string;

  enabled: number;
  icon: string;
  id: number;
  name: string;
  owner_icon: string;
  owner_id: number;
  owner_nick: string;
  owner_user_code: string;
  service_code: string;
  update_at: string;
  ver: number;
}

export interface BrokerApply extends BrokerInfo {
  stat: number;
}
