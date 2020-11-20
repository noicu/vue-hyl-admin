import type { AppRouteModule } from '/@/router/types';

import { PAGE_LAYOUT_COMPONENT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';

const master: AppRouteModule = {
  layout: {
    path: '/master',
    name: 'Master',
    component: PAGE_LAYOUT_COMPONENT,
    redirect: '/master/masterList',
    meta: {
      icon: 'ant-design:home-outlined',
      title: '大师',
    },
  },

  routes: [
    {
      path: '/masterList',
      name: 'MasterList',
      component: () => import('/@/views/master/index.vue'),
      meta: {
        icon: 'ant-design:home-outlined',
        title: '大师列表',
        roles: [RoleEnum.SUPER],
      },
    },
  ],
};

export default master;
