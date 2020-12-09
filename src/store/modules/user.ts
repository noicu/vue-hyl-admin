import type { LoginParams, UserInfo } from '/@/api/sys/model/userModel';

import store from '/@/store/index';
import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper';

import { PageEnum } from '/@/enums/pageEnum';
import { RoleEnum } from '/@/enums/roleEnum';
import { CacheTypeEnum, ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';

import { useMessage } from '/@/hooks/web/useMessage';

import router from '/@/router';

import { loginApi } from '/@/api/sys/user';

import { setLocal, getLocal, getSession, setSession } from '/@/utils/helper/persistent';
import { useProjectSetting } from '/@/hooks/setting';
import { useI18n } from '/@/hooks/web/useI18n';

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
  // user info
  private userInfoState: UserInfo | null = null;

  // token
  private tokenState = '';

  // roleList
  private roleListState: RoleEnum[] = [];

  get getUserInfoState(): UserInfo {
    return this.userInfoState || getCache<UserInfo>(USER_INFO_KEY) || {};
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
  async login(params: LoginParams, goHome = true): Promise<UserInfo | null> {
    try {
      const data = await loginApi(params);
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

      goHome && router.push(PageEnum.BASE_HOME);
      return user_info;
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
