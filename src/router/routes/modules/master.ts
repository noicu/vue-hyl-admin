import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';
import { RoleEnum } from '/@/enums/roleEnum';

const master: AppRouteModule = {
  path: '/master-manager',
  name: 'MasterManager',
  component: LAYOUT,
  redirect: '/master',
  meta: {
    icon: 'mdi:account-star-outline',
    title: t('routes.yi.master.master'),
  },
  children: [
    {
      path: '/master',
      name: 'Master',
      component: () => import('/@/views/master/index.vue'),
      meta: {
        icon: 'mdi:account-star-outline',
        title: t('routes.yi.master.masterList'),
        roles: [RoleEnum.SUPER],
      },
    },
    {
      path: '/master',
      name: 'Master',
      component: () => import('/@/views/broker/full/Master.vue'),
      meta: {
        icon: 'mdi:account-star-outline',
        title: t('routes.yi.master.masterList'),
        roles: [RoleEnum.BROKER],
      },
    },
    {
      path: '/masterFull/:id',
      name: 'MasterFull',
      component: () => import('/@/views/master/full/index.vue'),
      meta: {
        title: '详情',
        carryParam: true,
        roles: [RoleEnum.SUPER],
      },
    },
  ],
};

export default master;
