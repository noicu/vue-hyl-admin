/**
 * 帖子
 */
import type { MenuModule } from '/@/router/types.d';

const menu: MenuModule = {
  orderNo: 9,
  menu: {
    name: '帖子标准',
    path: '/postings',
    children: [
      {
        name: '闪断帖标准',
        path: 'vie',
      },
      {
        name: '悬赏帖标准',
        path: 'prize',
      },
    ],
  },
};
export default menu;
