import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';
import { RoleEnum } from '/@/enums/roleEnum';

const admin: AppRouteModule = {
  path: '/admin-manager',
  name: 'AdminManager',
  component: LAYOUT,
  redirect: '/admin',
  meta: {
    icon: 'carbon:table-split',
    title: t('routes.yi.admin.admin'),
  },
  children: [
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('/@/views/admin/index.vue'),
      meta: {
        icon: 'carbon:table-split',
        title: t('routes.yi.admin.adminList'),
        roles: [RoleEnum.SUPER],
      },
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('/@/views/broker/full/Admin.vue'),
      meta: {
        icon: 'carbon:table-split',
        title: t('routes.yi.admin.adminList'),
        roles: [RoleEnum.BROKER],
      },
    },
  ],
};

export default admin;
