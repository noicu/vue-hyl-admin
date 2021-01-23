import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/user-manager',
  name: 'UserManager',
  component: LAYOUT,
  redirect: '/user',
  meta: {
    icon: 'bx:bx-user',
    title: '用户',
  },
  children: [
    {
      path: '/user',
      name: 'User',
      component: () => import('/@/views/user/index.vue'),
      meta: {
        // roles: [RoleEnum.BROKER],
        title: '用户列表',
        icon: 'bx:bx-user',
      },
    },
  ],
};

export default dashboard;
