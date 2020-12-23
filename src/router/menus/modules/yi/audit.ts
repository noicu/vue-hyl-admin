import type { MenuModule } from '/@/router/types.d';

const menu: MenuModule = {
  orderNo: 9,
  menu: {
    name: '审批',
    path: '/audit',
    children: [
      {
        path: 'audit-master',
        name: '大师审批',
      },
      {
        path: 'audit-broker',
        name: '运营商审批',
      },
      {
        path: 'audit-draw-money',
        name: '提现审批',
      },
    ],
  },
};
export default menu;
