import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/personal-manager',
  name: 'PersonalManager',
  component: LAYOUT,
  redirect: '/personal',
  meta: {
    icon: 'bx:bx-home',
    title: '个人资料',
  },
  children: [
    {
      path: '/personal',
      name: 'Personal',
      component: () => import('/@/views/personal/index.vue'),
      meta: {
        title: '个人资料',
        icon: 'bx:bx-home',
      },
    },
  ],
};

export default dashboard;
