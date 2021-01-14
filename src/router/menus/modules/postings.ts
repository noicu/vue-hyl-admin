/**
 * 帖子
 */
import type { MenuModule } from '/@/router/types.d';

const menu: MenuModule = {
  orderNo: 9,
  menu: {
    name: '收费标准',
    path: '/postings',
    children: [
      {
        name: '闪断帖收费标准',
        path: 'vie',
      },
      {
        name: '悬赏帖收费标准',
        path: 'prize',
      },
    ],
  },
};
export default menu;
