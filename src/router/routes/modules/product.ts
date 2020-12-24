import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const product: AppRouteModule = {
  path: '/product-manager',
  name: 'ProductManager',
  component: LAYOUT,
  redirect: '/product',
  meta: {
    icon: 'carbon:table-split',
    title: t('routes.yi.product.product'),
  },
  children: [
    {
      path: '/product',
      name: 'Product',
      component: () => import('/@/views/product/index.vue'),
      meta: {
        icon: 'carbon:table-split',
        title: t('routes.yi.product.productList'),
      },
    },
    {
      path: '/product/:id',
      name: 'ProductFull',
      component: () => import('/@/views/product/full/index.vue'),
      meta: {
        title: '详情',
        icon: 'carbon:table-split',
        carryParam: true,
      },
    },
    {
      path: '/product/',
      name: 'ProductAdd',
      component: () => import('/@/views/product/full/index.vue'),
      meta: {
        title: '添加',
        icon: 'carbon:table-split',
        carryParam: true,
      },
    },
  ],
};

export default product;
