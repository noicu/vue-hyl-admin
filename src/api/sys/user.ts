import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel } from './model/userModel';
import { ErrorMessageMode } from '/@/utils/http/axios/types';

enum Api {
  LOGIN_URL = '/yi/user/Login',
}

/**
 * @description: 用户登录
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.request<LoginResultModel>(
    {
      url: Api.LOGIN_URL,
      method: 'POST',
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}
