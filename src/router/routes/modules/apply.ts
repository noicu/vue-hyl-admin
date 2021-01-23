import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';

const audit: AppRouteModule = {
  path: '/apply',
  name: 'Apply',
  component: LAYOUT,
  meta: {
    icon: 'carbon:thumbnail-preview',
    title: '审批',
    roles: [RoleEnum.SUPER],
  },
  children: [
    {
      path: 'master',
      name: 'ApplyMaster',
      component: () => import('/@/views/apply/ApplyMaster.vue'),
      meta: {
        title: '大师申请',
        roles: [RoleEnum.SUPER],
      },
    },
    {
      path: 'broker',
      name: 'ApplyBroker',
      component: () => import('/@/views/apply/ApplyBroker.vue'),
      meta: {
        title: '运营商申请',
        roles: [RoleEnum.SUPER],
      },
    },
  ],
};

export default audit;
