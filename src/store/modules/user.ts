import type { LoginParams, UserInfo } from '/@/api/sys/model/userModel';

import store from '/@/store/index';
import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper';

import { PageEnum } from '/@/enums/pageEnum';
import { RoleEnum } from '/@/enums/roleEnum';
import { CacheTypeEnum, ROLES_KEY, TOKEN_KEY, USER_INFO_KEY, REMAINDER } from '/@/enums/cacheEnum';

import { useMessage } from '/@/hooks/web/useMessage';

import router from '/@/router';

import { loginApi } from '/@/api/sys/user';

import { setLocal, getLocal, getSession, setSession } from '/@/utils/helper/persistent';
import { useProjectSetting } from '/@/hooks/setting';
import { useI18n } from '/@/hooks/web/useI18n';
import { ErrorMessageMode } from '/@/utils/http/axios/types';

import { getUser, setUser } from '/@/api/user';
import { remainderBrokerGet } from '/@/api/trade';

// export type UserInfo = Omit<GetUserInfoByUserIdModel, 'roles'>;

const NAME = 'user';
hotModuleUnregisterModule(NAME);

const { permissionCacheType } = useProjectSetting();

function getCache<T>(key: string) {
  const fn = permissionCacheType === CacheTypeEnum.LOCAL ? getLocal : getSession;
  return fn(key) as T;
}

function setCache(USER_INFO_KEY: string, info: any) {
  if (!info) return;
  // const fn = permissionCacheType === CacheTypeEnum.LOCAL ? setLocal : setSession;
  setLocal(USER_INFO_KEY, info, true);
  // TODO
  setSession(USER_INFO_KEY, info, true);
}

@Module({ namespaced: true, name: NAME, dynamic: true, store })
class User extends VuexModule {
  // 用户信息
  private userInfoState: UserInfo | null = null;

  // 余额
  private remainder = 0;

  // token
  private tokenState = '';

  // 角色列表
  private roleListState: RoleEnum[] = [];

  get getUserInfoState(): UserInfo {
    return this.userInfoState || getCache<UserInfo>(USER_INFO_KEY) || {};
  }

  get getRemainderState(): number {
    return this.remainder || getCache<number>(REMAINDER) || 0;
  }

  get getTokenState(): string {
    return this.tokenState || getCache<string>(TOKEN_KEY);
  }

  get getRoleListState(): RoleEnum[] {
    return this.roleListState.length > 0 ? this.roleListState : getCache<RoleEnum[]>(ROLES_KEY);
  }

  @Mutation
  commitResetState(): void {
    this.userInfoState = null;
    this.tokenState = '';
    this.roleListState = [];
  }

  @Mutation
  commitRemainderState(remainder: number): void {
    this.remainder = remainder;
    setCache(REMAINDER, remainder);
  }

  @Mutation
  commitUserInfoState(info: UserInfo): void {
    this.userInfoState = info;
    setCache(USER_INFO_KEY, info);
  }

  @Mutation
  commitRoleListState(roleList: RoleEnum[]): void {
    this.roleListState = roleList;
    setCache(ROLES_KEY, roleList);
  }

  @Mutation
  commitTokenState(info: string): void {
    this.tokenState = info;
    setCache(TOKEN_KEY, info);
  }

  /**
   * @description: 登录 login
   */
  @Action
  // async login(params: LoginParams, goHome = true): Promise<UserInfo | null> {
  async login(
    params: LoginParams & {
      goHome?: boolean;
      mode?: ErrorMessageMode;
    }
  ): Promise<UserInfo | null> {
    try {
      const { goHome = true, mode, ...loginParams } = params;
      const data = await loginApi(loginParams, mode);
      const { jwt, user_info, is_admin, is_broker_admin } = data;

      const roleList = [];

      if (!is_admin && !is_broker_admin) {
        const { createErrorModal } = useMessage();
        createErrorModal({
          content: '用户名或密码输入错误！',
        });
        return null;
      }

      if (is_admin) roleList.push('super');
      if (is_broker_admin) roleList.push('broker');

      // 保存 Token
      this.commitTokenState(jwt);
      // 保存 权限
      this.commitRoleListState(roleList as RoleEnum[]);
      // 保存 用户信息
      this.commitUserInfoState(user_info);

      if (is_broker_admin) {
        await this.getRemainder();
      }

      goHome && (await router.replace(PageEnum.BASE_HOME));
      return user_info;
    } catch (error) {
      return null;
    }
  }

  @Action
  async getUserInfo(): Promise<UserInfo | null> {
    try {
      const data = await getUser();
      this.commitUserInfoState(data);
      return data;
    } catch (error) {
      return null;
    }
  }

  @Action
  async getRemainder(): Promise<number> {
    try {
      const data = await remainderBrokerGet({
        broker_id: this.getUserInfoState.broker_id,
      });
      this.commitRemainderState(data.remainder);
      return data.remainder;
    } catch (error) {
      return 0;
    }
  }

  @Action
  async setUserInfo(params: any): Promise<UserInfo | null> {
    try {
      await setUser({ data: params });
      const data = await this.getUserInfo();
      return data;
    } catch (error) {
      return null;
    }
  }

  /**
   * @description: 注销
   */
  @Action
  async loginOut(goLogin = false) {
    goLogin && router.push(PageEnum.BASE_LOGIN);
  }

  /**
   * @description: Confirm before logging out
   */
  @Action
  async confirmLoginOut() {
    const { createConfirm } = useMessage();
    const { t } = useI18n();
    createConfirm({
      iconType: 'warning',
      title: t('sys.app.loginOutTip'),
      content: t('sys.app.loginOutMessage'),
      onOk: async () => {
        await this.loginOut(true);
      },
    });
  }
}
export const userStore = getModule<User>(User);
