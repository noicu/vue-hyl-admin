import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';

const master: AppRouteModule = {
  path: '/postings',
  name: 'Postings',
  component: LAYOUT,
  redirect: '/postings/prize',
  meta: {
    icon: 'carbon:table-split',
    title: '贴子',
  },
  children: [
    {
      path: 'prize',
      name: 'Prize',
      component: () => import('/@/views/postings/prize/PriceLevelPrizeList.vue'),
      meta: {
        icon: 'carbon:table-split',
        title: '悬赏贴标准',
        roles: [RoleEnum.SUPER],
      },
    },
    {
      path: 'vie',
      name: 'Vie',
      component: () => import('/@/views/postings/vie/PriceLevelVieList.vue'),
      meta: {
        icon: 'carbon:table-split',
        title: '闪断贴标准',
        roles: [RoleEnum.SUPER],
      },
    },
    {
      path: 'prize',
      name: 'Prize',
      component: () => import('/@/views/postings/prize/BrokerPriceLevelPrizeList.vue'),
      meta: {
        icon: 'carbon:table-split',
        title: '悬赏贴标准',
        roles: [RoleEnum.BROKER],
      },
    },
    {
      path: 'vie',
      name: 'Vie',
      component: () => import('/@/views/postings/vie/BrokerPriceLevelVieList.vue'),
      meta: {
        icon: 'carbon:table-split',
        title: '闪断贴标准',
        roles: [RoleEnum.BROKER],
      },
    },
  ],
};

export default master;
