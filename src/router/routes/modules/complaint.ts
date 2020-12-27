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
    {
      path: '/complaint-full/:id',
      name: 'ComplaintFull',
      component: () => import('/@/views/complaint/Full.vue'),
      meta: {
        icon: 'carbon:table-split',
        title: '投诉详情',
      },
    },
  ],
};

export default complaint;
