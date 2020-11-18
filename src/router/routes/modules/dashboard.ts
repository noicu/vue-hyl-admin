import type { AppRouteModule } from '/@/router/types';

import { PAGE_LAYOUT_COMPONENT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  layout: {
    path: '/dashboard',
    name: 'Dashboard',
    component: PAGE_LAYOUT_COMPONENT,
    redirect: '/dashboard/workbench',
    meta: {
      icon: 'ant-design:home-outlined',
      title: 'Dashboard',
    },
  },

  routes: [
    {
      path: '/workbench',
      name: 'Workbench',
      component: () => import('/@/views/dashboard/index.vue'),
      meta: {
        icon: 'ant-design:home-outlined',
        title: '工作台',
        affix: true,
      },
    },
  ],
};

export default dashboard;
