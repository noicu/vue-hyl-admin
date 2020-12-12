import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const broker: AppRouteModule = {
  path: '/broker',
  name: 'Broker',
  component: LAYOUT,
  redirect: '/broker/brokerList',
  meta: {
    icon: 'carbon:table-split',
    title: t('routes.yi.broker.broker'),
  },
  children: [
    {
      path: 'brokerList',
      name: 'BrokerList',
      component: () => import('/@/views/broker/index.vue'),
      meta: {
        title: t('routes.yi.broker.brokerList'),
      },
    },
  ],
};

export default broker;
