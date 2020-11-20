import { ApiGetList, ApiResultList } from '../model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { Result } from '/@/utils/http/axios/types';

enum Api {
  SYS_ADMIN_PAGE = '/yi/user/SysAdminPage', // 管理员分页
  SYS_ADMIN_ADD = '/yi/user/SysAdminAdd', // 新增管理员
  SYS_ADMIN_RM = '/yi/user/SysAdminRm', // 删除管理员
  SYS_ADMIN_CH = '/yi/user/SysAdminCh', // 启用禁用管理员
  SYS_ADMIN_GET = '/yi/user/SysAdminGet', // 根据uid获取管理员
}

export interface AdminInfo {
  ID: number;
  enabled: number;
  icon: string;
  nick: string;
  uid: number;
  user_code: string;
}

/**
 * @description: 获取系统管理员列表
 */
export function adminInfoList(params: ApiGetList<AdminInfo>) {
  return defHttp.request<ApiResultList<AdminInfo>>({
    url: Api.SYS_ADMIN_PAGE,
    method: 'POST',
    params,
  });
}
