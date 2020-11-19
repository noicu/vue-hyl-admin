import type { AppRouteModule } from '/@/router/types';

import { PAGE_LAYOUT_COMPONENT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';

const broker: AppRouteModule = {
  layout: {
    path: '/broker',
    name: 'broker',
    component: PAGE_LAYOUT_COMPONENT,
    redirect: '/broker/brokerList',
    meta: {
      icon: 'ant-design:home-outlined',
      title: '运营商',
    },
  },

  routes: [
    {
      path: '/brokerList',
      name: 'BrokerList',
      component: () => import('/@/views/broker/index.vue'),
      meta: {
        icon: 'ant-design:home-outlined',
        title: '运营商列表',
        roles: [RoleEnum.SUPER],
      },
    },
  ],
};

export default broker;
