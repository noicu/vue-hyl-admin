import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const master: AppRouteModule = {
  path: '/master',
  name: 'Master',
  component: LAYOUT,
  redirect: '/master/masterList',
  meta: {
    icon: 'carbon:table-split',
    title: t('routes.yi.master.master'),
  },
  children: [
    {
      path: 'masterList',
      name: 'MasterList',
      component: () => import('/@/views/master/index.vue'),
      meta: {
        title: t('routes.yi.master.masterList'),
      },
    },
  ],
};

export default master;
