import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';
import { RoleEnum } from '/@/enums/roleEnum';

const product: AppRouteModule = {
  path: '/product-manager',
  name: 'ProductManager',
  component: LAYOUT,
  redirect: '/product',
  meta: {
    icon: 'ic:twotone-store-mall-directory',
    title: t('routes.yi.product.product'),
  },
  children: [
    {
      path: '/product',
      name: 'Product',
      component: () => import('/@/views/product/index.vue'),
      meta: {
        icon: 'ic:twotone-store-mall-directory',
        title: t('routes.yi.product.productList'),
        roles: [RoleEnum.SUPER],
      },
    },
    {
      path: '/product',
      name: 'Product',
      component: () => import('/@/views/broker/full/Product.vue'),
      meta: {
        icon: 'ic:twotone-store-mall-directory',
        title: t('routes.yi.product.productList'),
        roles: [RoleEnum.BROKER],
      },
    },
    {
      path: '/product/:id',
      name: 'ProductFull',
      component: () => import('/@/views/product/full/index.vue'),
      meta: {
        title: '详情',
        carryParam: true,
        roles: [RoleEnum.SUPER],
      },
    },
    {
      path: '/product/',
      name: 'ProductAdd',
      component: () => import('/@/views/product/full/AddProduct.vue'),
      meta: {
        title: '添加商品',
        carryParam: true,
        roles: [RoleEnum.SUPER],
      },
    },
  ],
};

export default product;
