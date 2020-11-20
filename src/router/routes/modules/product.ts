import type { AppRouteModule } from '/@/router/types';

import { PAGE_LAYOUT_COMPONENT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';

const product: AppRouteModule = {
  layout: {
    path: '/product',
    name: 'Product',
    component: PAGE_LAYOUT_COMPONENT,
    redirect: '/product/productList',
    meta: {
      icon: 'ant-design:home-outlined',
      title: '商品',
    },
  },

  routes: [
    {
      path: '/productList',
      name: 'ProductList',
      component: () => import('/@/views/product/index.vue'),
      meta: {
        icon: 'ant-design:home-outlined',
        title: '商品列表',
        roles: [RoleEnum.SUPER],
      },
    },
    {
      path: '/productDesc/:id',
      name: 'ProductDesc',
      component: () => import('/@/views/product/desc/index.vue'),
      meta: {
        title: '详情',
        carryParam: true,
      },
    },
  ],
};

export default product;
