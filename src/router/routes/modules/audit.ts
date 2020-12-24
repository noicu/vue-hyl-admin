import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const audit: AppRouteModule = {
  path: '/audit',
  name: 'Audit',
  component: LAYOUT,
  meta: {
    icon: 'carbon:table-split',
    title: '审批',
  },
  children: [
    {
      path: 'audit-master',
      name: 'AuditMaster',
      component: () => import('/@/views/admin/index.vue'),
      meta: {
        title: '大师申请',
      },
    },
    {
      path: 'audit-broker',
      name: 'AuditBroker',
      component: () => import('/@/views/admin/index.vue'),
      meta: {
        title: '运营商申请',
      },
    },
    {
      path: 'audit-draw-money',
      name: 'AuditDrawMoney',
      component: () => import('/@/views/admin/index.vue'),
      meta: {
        title: '提现申请',
      },
    },
  ],
};

export default audit;
