import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';

const draw: AppRouteModule = {
  path: '/draw',
  name: 'Draw',
  redirect: '/draw/bdm',
  component: LAYOUT,
  meta: {
    icon: 'carbon:table-split',
    title: '提现',
  },
  children: [
    {
      path: 'bdm',
      name: 'Draw',
      component: () => import('/@/views/draw/BrokerDrawMoney.vue'),
      meta: {
        title: '提现',
        roles: [RoleEnum.BROKER],
      },
    },
    {
      path: 'master',
      name: 'MasterDraw',
      component: () => import('/@/views/draw/MasterDrawMoney.vue'),
      meta: {
        title: '大师提现',
        roles: [RoleEnum.SUPER],
      },
    },
    {
      path: 'broker',
      name: 'BrokerDraw',
      component: () => import('/@/views/draw/BrokerDrawMoney.vue'),
      meta: {
        title: '运营商提现',
        roles: [RoleEnum.SUPER],
      },
    },
  ],
};

export default draw;
