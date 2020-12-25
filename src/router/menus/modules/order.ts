/**
 * 订单管理
 */
import type { MenuModule } from '/@/router/types.d';

const menu: MenuModule = {
  orderNo: 9,
  menu: {
    name: '订单',
    path: '/order',
    children: [
      {
        name: '大师订单',
        path: 'master',
      },
      {
        name: '商品订单',
        path: 'product',
      },
    ],
  },
};
export default menu;
