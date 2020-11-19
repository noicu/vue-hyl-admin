/**
 * @description: 登录接口参数
 */
export interface LoginParams {
  user_code: string;
  pwd: string;
  chart_key: string;
  chart_value: string;
}

/**
 * @description: Get user information
 */
export interface GetUserInfoByUserIdParams {
  userId: string | number;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: 登录返回结果
 */
export interface LoginResultModel {
  is_admin: boolean;
  is_broker_admin: boolean;
  is_master: boolean;
  jwt: string;
  modules: any;
  user_info: UserInfo;
}

/**
 * @description: 用户信息
 */
export interface UserInfo {
  area: string;
  birth_day: number;
  birth_month: number;
  birth_year: number;
  broker_id: number;
  city: string;
  country: string;
  created_at: string;
  enabled: boolean;
  icon: string;
  id: number;
  id_card: string;
  nick: string;
  province: string;
  pwd: string;
  sex: number;
  update_at: string;
  user_code: string;
  user_name: string;
  ver: number;
}

// /**
//  * @description: Get user information return value
//  */
// export interface GetUserInfoByUserIdModel {
//   role: RoleInfo;
//   // 用户id
//   userId: string | number;
//   // 用户名
//   username: string;
//   // 真实名字
//   realName: string;
//   // 介绍
//   desc?: string;
// }
