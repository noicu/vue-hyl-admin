import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';
import { RoleEnum } from '/@/enums/roleEnum';

const broker: AppRouteModule = {
  path: '/broker-manager',
  name: 'BrokerManager',
  component: LAYOUT,
  redirect: '/broker',
  meta: {
    icon: 'carbon:table-split',
    title: t('routes.yi.broker.broker'),
    roles: [RoleEnum.SUPER],
  },
  children: [
    {
      path: '/broker',
      name: 'Broker',
      component: () => import('/@/views/broker/index.vue'),
      meta: {
        icon: 'carbon:table-split',
        title: t('routes.yi.broker.brokerList'),
        roles: [RoleEnum.SUPER],
      },
    },
    {
      path: '/broker/:id',
      name: 'BrokerFull',
      component: () => import('/@/views/broker/full/index.vue'),
      meta: {
        title: '运营商',
        icon: 'carbon:table-split',
        carryParam: true,
        roles: [RoleEnum.SUPER],
      },
    },
    {
      path: '/broker/',
      name: 'BrokerAdd',
      component: () => import('/@/views/broker/full/index.vue'),
      meta: {
        title: '添加',
        icon: 'carbon:table-split',
        carryParam: true,
        roles: [RoleEnum.SUPER],
      },
    },
  ],
};

export default broker;
