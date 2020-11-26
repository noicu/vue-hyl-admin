import type { MenuModule } from '/@/router/types.d';
const menu: MenuModule = {
  orderNo: 20,
  menu: {
    name: '测试',
    path: '/test',
    children: [
      {
        name: '分形',
        path: 'fractal',
      },
      {
        name: '分形',
        path: 'fractal',
      },
    ],
  },
};
export default menu;
