import { t } from '/@/hooks/web/useI18n';
import type { MenuModule } from '/@/router/types.d';

const menu: MenuModule = {
  orderNo: 9,
  menu: {
    name: t('routes.yi.broker.broker'),
    path: '/broker',
    children: [
      {
        path: 'brokerList',
        name: t('routes.yi.broker.brokerList'),
      },
    ],
  },
};
export default menu;
