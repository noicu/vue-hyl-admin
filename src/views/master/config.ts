import { BasicColumn } from '/@/components/Table';

export const Columns: BasicColumn[] = [
  // {
  //   title: 'UID',
  //   width: 150,
  //   dataIndex: 'uid',
  // },
  {
    title: '昵称',
    dataIndex: 'nick',
    width: 120,
  },
  {
    title: '手机号',
    dataIndex: 'user_code',
  },

  // {
  //   title: '差评率',
  //   dataIndex: 'bad_rate',
  // },
  // {
  //   title: '好评率',
  //   dataIndex: 'best_rate',
  // },
  // {
  //   title: '中评',
  //   dataIndex: 'mid_rate',
  // },
  // {
  //   title: 'rate',
  //   dataIndex: 'rate',
  // },
  {
    title: '摘要',
    dataIndex: 'brief',
  },
  // {
  //   title: 'level',
  //   dataIndex: 'level',
  // },

  {
    title: '订单量',
    dataIndex: 'order_total',
  },

  {
    title: '退款',
    dataIndex: 'rebate',
  },
  // {
  //   title: 'sign_date',
  //   dataIndex: 'sign_date',
  // },
  // {
  //   title: 'update_at',
  //   dataIndex: 'update_at',
  // },
  {
    title: '状态',
    width: 70,
    dataIndex: 'enabled',
    slots: { customRender: 'enabled' },
  },
  // {
  //   title: '操作',
  //   width: 70,
  //   dataIndex: 'ID',
  //   slots: { customRender: 'action' },
  // },
];
