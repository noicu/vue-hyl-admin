/**
 * 申请管理
 */
import type { MenuModule } from '/@/router/types.d';

const menu: MenuModule = {
  orderNo: 9,
  menu: {
    name: '审批',
    path: '/apply',
    children: [
      {
        name: '大师申请',
        path: 'master',
      },
      {
        name: '运营商申请',
        path: 'broker',
      },
    ],
  },
};
export default menu;
