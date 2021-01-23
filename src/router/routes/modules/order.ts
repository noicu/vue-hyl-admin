import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';

const order: AppRouteModule = {
  path: '/order',
  name: 'Order',
  redirect: '/order/product',
  component: LAYOUT,
  meta: {
    icon: 'fluent:form-new-28-regular',
    title: '订单',
  },
  children: [
    {
      path: 'product',
      name: 'OrderProduct',
      component: () => import('/@/views/order/Product.vue'),
      meta: {
        icon: 'fluent:form-new-28-regular',
        title: '商品订单',
      },
    },
    {
      path: 'master',
      name: 'OrderMaster',
      component: () => import('/@/views/order/Master.vue'),
      meta: {
        icon: 'fluent:form-new-28-regular',
        title: '大师订单',
        roles: [RoleEnum.SUPER],
      },
    },
    {
      path: 'master',
      name: 'OrderMaster',
      component: () => import('/@/views/order/MasterHis.vue'),
      meta: {
        icon: 'fluent:form-new-28-regular',
        title: '大师订单',
        roles: [RoleEnum.BROKER],
      },
    },
    {
      path: 'product-his',
      name: 'ProductHis',
      component: () => import('/@/views/order/ProductHis.vue'),
      meta: {
        icon: 'fluent:form-new-28-regular',
        title: '商品历史订单',
      },
    },
    {
      path: 'master-his',
      name: 'MasterHis',
      component: () => import('/@/views/order/MasterHis.vue'),
      meta: {
        icon: 'fluent:form-new-28-regular',
        title: '大师历史订单',
      },
    },
  ],
};

export default order;
