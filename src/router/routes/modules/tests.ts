import type { AppRouteModule } from '/@/router/types';

import { PAGE_LAYOUT_COMPONENT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';

const test: AppRouteModule = {
  layout: {
    path: '/test',
    name: 'Test',
    component: PAGE_LAYOUT_COMPONENT,
    redirect: '/test/fractal',
    meta: {
      icon: 'ant-design:home-outlined',
      title: '测试',
    },
  },

  routes: [
    {
      path: '/fractal',
      name: 'Fractal',
      component: () => import('/@/views/tests/index.vue'),
      meta: {
        title: '分形',
        roles: [RoleEnum.SUPER],
      },
    },
  ],
};

export default test;
