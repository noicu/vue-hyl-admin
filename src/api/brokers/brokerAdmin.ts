enum Api {
  BROKER_ADMIN_LIST_URL       = '/yi/user/BrokerAdminList',        // 获取代理管理员列表
  BROKER_ADMIN_ADD_URL        = '/yi/user/BrokerAdminAdd',         // 新增代理管理
  BROKER_ADMIN_RM_URL         = '/yi/user/BrokerAdminRm',          // 删除代理管理员
  BROKER_APPLY_PAGE_URL       = '/yi/user/BrokerApplyPage',        // w代理申请信息分页查
  BROKER_APPLY_AUDIT_URL      = '/yi/user/BrokerApplyAudit',       // w代理审
  BROKER_INFO_PAGE_URL        = '/yi/user/BrokerInfoPage',         // w代理分页查
  BROKER_USER_INFO_PAGE_URL   = '/yi/user/BrokerUserInfoPage',     // 获取运营商所有的用户（包含本身及代理管理员）分页数据
  BROKER_IDGET_URL            = '/yi/user/BrokerIDGet',            // 根据服务代码获取代理id
  BROKER_INFO_GET_URL         = '/yi/user/BrokerInfoGet',          // 通过id获取代理信息
  BROKER_USER_INFO_SEARCH_URL = '/yi/user/BrokerUserInfoSearch',   // 按代理id搜索用户信息
  SERVICE_CODE_BIND_URL       = '/yi/user/ServiceCodeBind',        // 服务代码绑定
}
