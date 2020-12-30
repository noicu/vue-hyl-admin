import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';

const statistics: AppRouteModule = {
  path: '/statistics-manager',
  name: 'StatisticsManager',
  component: LAYOUT,
  redirect: '/statistics',
  meta: {
    icon: 'carbon:table-split',
    title: '统计',
    roles: [RoleEnum.TEST],
  },
  children: [
    {
      path: '/statistics',
      name: 'Statistics',
      component: () => import('/@/views/statistics/index.vue'),
      meta: {
        icon: 'carbon:table-split',
        title: '统计',
        roles: [RoleEnum.TEST],
      },
    },
  ],
};

export default statistics;
