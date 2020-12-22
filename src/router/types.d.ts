import type { RouteRecordRaw } from 'vue-router';
import { RoleEnum } from '/@/enums/roleEnum';
import Component from '/@/components/types';
export interface RouteMeta {
  // 名称
  title: string;
  // 是否忽略权限
  ignoreAuth?: boolean;
  // 角色信息
  roles?: RoleEnum[];
  // 是否不缓存
  ignoreKeepAlive?: boolean;
  // 它固定在选项卡上吗
  affix?: boolean;
  // 标签上的图标
  icon?: string;
  // 跳转地址
  frameSrc?: string;
  // 当前页面过渡
  transitionName?: string;

  // 路由是否已动态添加
  hideBreadcrumb?: boolean;

  // 携带参数
  carryParam?: boolean;

  // 在内部用于标记单级菜单
  single?: boolean;
}

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string;
  meta: RouteMeta;
  component?: Component;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Record<string, any>;
  fullPath?: string;
}
export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success';
  content?: string;
  dot?: boolean;
}

export interface Menu {
  name: string;

  icon?: string;

  path: string;

  disabled?: boolean;

  children?: Menu[];

  orderNo?: number;

  roles?: RoleEnum[];

  meta?: Partial<RouteMeta>;

  tag?: MenuTag;
}

export interface MenuModule {
  orderNo?: number;
  menu: Menu;
}

// interface RouteModule {
//   layout: AppRouteRecordRaw;
//   routes: AppRouteRecordRaw[];
//   children?: AppRouteRecordRaw[];
//   component?: Component;
// }

// export type AppRouteModule = RouteModule | AppRouteRecordRaw;
export type AppRouteModule = AppRouteRecordRaw;
