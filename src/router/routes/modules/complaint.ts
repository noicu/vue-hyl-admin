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
      path: '/complaint-his',
      name: 'ComplaintHis',
      component: () => import('/@/views/complaint/ComplaintHis.vue'),
      meta: {
        icon: 'carbon:table-split',
        title: '投诉历史',
      },
    },
    {
      path: '/complaint/:id',
      name: 'ComplaintFull',
      component: () => import('/@/views/complaint/Full.vue'),
      meta: {
        icon: 'carbon:table-split',
        title: '投诉详情',
      },
    },
    {
      path: '/complaint-his/:id',
      name: 'ComplaintFullHis',
      component: () => import('/@/views/complaint/Full.vue'),
      props: { his: true },
      meta: {
        icon: 'carbon:table-split',
        title: '投诉详情',
      },
    },
  ],
};

export default complaint;
