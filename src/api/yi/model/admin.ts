export enum Api {
  SYS_ADMIN_PAGE = '/yi/user/SysAdminPage', // 管理员分页
  SYS_ADMIN_ADD = '/yi/user/SysAdminAdd', // 新增管理员
  SYS_ADMIN_RM = '/yi/user/SysAdminRm', // 删除管理员
  SYS_ADMIN_CH = '/yi/user/SysAdminCh', // 启用禁用管理员
  SYS_ADMIN_GET = '/yi/user/SysAdminGet', // 根据uid获取管理员

  SWITCH_TO_MASTER = '/yi/user/SwitchToMaster', // 普通用户转为大师------S
  SWITCH_TO_BROKER = '/yi/user/SwitchToBroker', // 普通用户转换为运营商------S
}

export interface AdminInfo {
  ID: number;
  enabled: number;
  icon: string;
  nick: string;
  uid: number;
  user_code: string;
}
