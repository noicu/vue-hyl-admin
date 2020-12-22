import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const broker: AppRouteModule = {
  path: '/broker-manager',
  name: 'BrokerManager',
  component: LAYOUT,
  redirect: '/broker',
  meta: {
    icon: 'carbon:table-split',
    title: t('routes.yi.broker.broker'),
  },
  children: [
    {
      path: '/broker',
      name: 'Broker',
      component: () => import('/@/views/broker/index.vue'),
      meta: {
        icon: 'carbon:table-split',
        title: t('routes.yi.broker.brokerList'),
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
      },
    },
  ],
};

export default broker;
