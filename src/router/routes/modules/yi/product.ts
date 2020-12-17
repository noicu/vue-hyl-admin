import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const product: AppRouteModule = {
  path: '/product',
  name: 'Product',
  component: LAYOUT,
  redirect: '/product/productList',
  meta: {
    icon: 'carbon:table-split',
    title: t('routes.yi.product.product'),
  },
  children: [
    {
      path: 'productList',
      name: 'ProductList',
      component: () => import('/@/views/product/index.vue'),
      meta: {
        title: t('routes.yi.product.productList'),
      },
    },
    {
      path: '/ProductFull/:id',
      name: 'ProductFull',
      component: () => import('/@/views/product/full/index.vue'),
      meta: {
        title: '详情',
        carryParam: true,
      },
    },
  ],
};

export default product;
