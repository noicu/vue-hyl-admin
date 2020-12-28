import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const statistics: AppRouteModule = {
  path: '/statistics-manager',
  name: 'StatisticsManager',
  component: LAYOUT,
  redirect: '/statistics',
  meta: {
    icon: 'carbon:table-split',
    title: '统计',
  },
  children: [
    {
      path: '/statistics',
      name: 'Statistics',
      component: () => import('/@/views/statistics/index.vue'),
      meta: {
        icon: 'carbon:table-split',
        title: '统计',
      },
    },
  ],
};

export default statistics;
