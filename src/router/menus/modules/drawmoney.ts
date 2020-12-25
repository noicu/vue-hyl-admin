/**
 * 提现管理
 */
import type { MenuModule } from '/@/router/types.d';

const menu: MenuModule = {
  orderNo: 9,
  menu: {
    name: '提现',
    path: '/draw',
    children: [
      {
        name: '大师提现',
        path: 'master',
      },
      {
        name: '运营商提现',
        path: 'broker',
      },
    ],
  },
};
export default menu;
