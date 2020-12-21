export enum Api {
  GET_USER_URL = '/yi/user/GetUser', // 获取用户信息
  GET_USER_PUBLIC_URL = '/yi/user/GetUserPublic', // 获取用户公开信息
  CH_USER_INFO_URL = '/yi/user/ChUserInfo', // 更改用户个人信息
  CH_USER_PWD_URL = '/yi/user/ChUserPwd', // 修改用户密码
  RESET_PWD_URL = '/yi/user/ResetPwd', // 重置密码

  SET_USER_ENABLED = '/yi/user/SetUserEnabled', // 启用或停用用户----B+S
}

export interface UID {
  uid: number;
}

export interface EnabledUser extends UID {
  enabled: number;
}
