import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel } from './model/userModel';

enum Api {
  LOGIN_URL = '/yi/user/Login',
}

/**
 * @description: 用户登录
 */
export function loginApi(params: LoginParams) {
  return defHttp.request<LoginResultModel>(
    {
      url: Api.LOGIN_URL,
      method: 'POST',
      params,
    },
    {
      errorMessageMode: 'modal',
    }
  );
}
