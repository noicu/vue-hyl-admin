import { t } from '/@/hooks/web/useI18n';
import type { MenuModule } from '/@/router/types.d';

const menu: MenuModule = {
  orderNo: 9,
  menu: {
    name: t('routes.yi.product.product'),
    path: '/product',
    children: [
      {
        path: 'productList',
        name: t('routes.yi.product.productList'),
      },
    ],
  },
};
export default menu;
