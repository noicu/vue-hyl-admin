import type { AppRouteModule } from '/@/router/types';

import { PAGE_LAYOUT_COMPONENT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';

const admin: AppRouteModule = {
  layout: {
    path: '/admin',
    name: 'Admin',
    component: PAGE_LAYOUT_COMPONENT,
    redirect: '/admin/adminList',
    meta: {
      icon: 'ant-design:home-outlined',
      title: '管理员',
    },
  },

  routes: [
    {
      path: '/adminList',
      name: 'AdminList',
      component: () => import('/@/views/admin/index.vue'),
      meta: {
        icon: 'ant-design:home-outlined',
        title: '管理员列表',
        roles: [RoleEnum.SUPER],
      },
    },
  ],
};

export default admin;
