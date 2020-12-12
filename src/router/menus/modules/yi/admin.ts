import { t } from '/@/hooks/web/useI18n';
import type { MenuModule } from '/@/router/types.d';

const menu: MenuModule = {
  orderNo: 9,
  menu: {
    name: t('routes.yi.admin.admin'),
    path: '/admin',
    children: [
      {
        path: 'adminList',
        name: t('routes.yi.admin.adminList'),
      },
    ],
  },
};
export default menu;
