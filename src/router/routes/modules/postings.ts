import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';

const master: AppRouteModule = {
  path: '/postings',
  name: 'Postings',
  component: LAYOUT,
  redirect: '/postings/prize',
  meta: {
    icon: 'fa-solid:balance-scale',
    title: '收费标准',
  },
  children: [
    {
      path: 'prize',
      name: 'Prize',
      component: () => import('/@/views/postings/prize/PriceLevelPrizeList.vue'),
      meta: {
        icon: 'fa-solid:balance-scale',
        title: '悬赏贴收费标准',
        roles: [RoleEnum.SUPER],
      },
    },
    {
      path: 'vie',
      name: 'Vie',
      component: () => import('/@/views/postings/vie/PriceLevelVieList.vue'),
      meta: {
        icon: 'fa-solid:balance-scale',
        title: '闪断贴收费标准',
        roles: [RoleEnum.SUPER],
      },
    },
    {
      path: 'prize',
      name: 'Prize',
      component: () => import('/@/views/postings/prize/BrokerPriceLevelPrizeList.vue'),
      meta: {
        icon: 'fa-solid:balance-scale',
        title: '悬赏贴收费标准',
        roles: [RoleEnum.BROKER],
      },
    },
    {
      path: 'vie',
      name: 'Vie',
      component: () => import('/@/views/postings/vie/BrokerPriceLevelVieList.vue'),
      meta: {
        icon: 'fa-solid:balance-scale',
        title: '闪断贴收费标准',
        roles: [RoleEnum.BROKER],
      },
    },
  ],
};

export default master;
