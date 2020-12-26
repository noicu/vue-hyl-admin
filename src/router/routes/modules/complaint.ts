import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const complaint: AppRouteModule = {
  path: '/complaint-manager',
  name: 'ComplaintManager',
  component: LAYOUT,
  redirect: '/complaint',
  meta: {
    icon: 'carbon:table-split',
    title: '投诉',
  },
  children: [
    {
      path: '/complaint',
      name: 'Complaint',
      component: () => import('/@/views/complaint/index.vue'),
      meta: {
        icon: 'carbon:table-split',
        title: '投诉',
      },
    },
  ],
};

export default complaint;
