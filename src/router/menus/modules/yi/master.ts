import { t } from '/@/hooks/web/useI18n';
import type { MenuModule } from '/@/router/types.d';

const menu: MenuModule = {
  orderNo: 9,
  menu: {
    name: t('routes.yi.master.master'),
    path: '/master',
    children: [
      {
        path: 'masterList',
        name: t('routes.yi.master.masterList'),
      },
    ],
  },
};
export default menu;
