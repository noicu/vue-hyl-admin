enum Api {
  LOGIN_URL = '/yi/user/Login', // 登录
}

export interface LoginPost {
  user_code  : string;
  pwd        : string;
  chart_key  : string;
  chart_value: string;
}
