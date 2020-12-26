import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';

const accounting: AppRouteModule = {
  path: '/accounting-manager',
  name: 'AccountingManager',
  component: LAYOUT,
  redirect: '/accounting',
  meta: {
    icon: 'carbon:table-split',
    title: '账务',
  },
  children: [
    {
      path: '/accounting',
      name: 'Accounting',
      component: () => import('/@/views/accounting/BusinessPlatPage.vue'),
      meta: {
        icon: 'carbon:table-split',
        title: '账务',
        roles: [RoleEnum.SUPER],
      },
    },
    {
      path: '/accounting',
      name: 'Accounting',
      component: () => import('/@/views/accounting/BusinessBrokerPage.vue'),
      meta: {
        icon: 'carbon:table-split',
        title: '账务',
        roles: [RoleEnum.BROKER],
      },
    },
  ],
};

export default accounting;
