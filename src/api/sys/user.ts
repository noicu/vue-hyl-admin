import { defHttp } from '/@/utils/http/axios';
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoByUserIdParams,
  UserInfo,
} from './model/userModel';

enum Api {
  LOGIN_URL = '/yi/user/Login', // 登录
  GET_USER_INFO_BY_ID = '/getUserInfoById',
  GET_PERM_CODE_BY_USER_ID = '/getPermCodeByUserId',
}

/**
 * @description: 用户登录接口
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

/**
 * @description: getUserInfoById
 */
export function getUserInfoById(params: GetUserInfoByUserIdParams) {
  return defHttp.request<UserInfo>({
    url: Api.GET_USER_INFO_BY_ID,
    method: 'GET',
    params,
  });
}

export function getPermCodeByUserId(params: GetUserInfoByUserIdParams) {
  return defHttp.request<string[]>({
    url: Api.GET_PERM_CODE_BY_USER_ID,
    method: 'GET',
    params,
  });
}
