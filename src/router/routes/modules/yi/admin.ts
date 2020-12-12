import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const admin: AppRouteModule = {
  path: '/admin',
  name: 'Admin',
  component: LAYOUT,
  redirect: '/admin/adminList',
  meta: {
    icon: 'carbon:table-split',
    title: t('routes.yi.admin.admin'),
  },
  children: [
    {
      path: 'adminList',
      name: 'AdminList',
      component: () => import('/@/views/admin/index.vue'),
      meta: {
        title: t('routes.yi.admin.adminList'),
      },
    },
  ],
};

export default admin;
