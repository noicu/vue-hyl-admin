import { BasicColumn } from '/@/components/Table';

export const ProductColumns: BasicColumn[] = [
  {
    title: 'amt',
    dataIndex: 'amt',
    width: 120,
  },
  {
    title: 'bill_no',
    dataIndex: 'bill_no',
  },
  {
    title: 'broker_name',
    dataIndex: 'broker_name',
  },
  {
    title: 'contact',
    dataIndex: 'contact',
  },
  {
    title: 'deliver',
    dataIndex: 'deliver',
  },
  {
    title: 'delivery_time',
    dataIndex: 'delivery_time',
  },
  {
    title: 'nick',
    dataIndex: 'nick',
  },
  {
    title: 'pay_type',
    dataIndex: 'pay_type',
  },
  {
    title: 'stat',
    dataIndex: 'stat',
  },
  {
    title: '操作',
    width: 160,
    dataIndex: 'ID',
    slots: { customRender: 'action' },
  },
];

export const MasterColumns: BasicColumn[] = [
  {
    title: 'amt',
    dataIndex: 'amt',
    width: 120,
  },
  {
    title: 'broker_name',
    dataIndex: 'broker_name',
  },
  {
    title: 'comment',
    dataIndex: 'comment',
  },
  {
    title: 'create_date',
    dataIndex: 'create_date',
  },
  {
    title: 'diagnose',
    dataIndex: 'diagnose',
  },
  {
    title: 'master_nick_ref',
    dataIndex: 'master_nick_ref',
  },
  {
    title: 'master_user_code_ref',
    dataIndex: 'master_user_code_ref',
  },
  {
    title: 'nick_ref',
    dataIndex: 'nick_ref',
  },
  {
    title: 'order_type',
    dataIndex: 'order_type',
  },
  {
    title: 'pay_amt',
    dataIndex: 'pay_amt',
  },
  {
    title: 'pay_type',
    dataIndex: 'pay_type',
  },
  {
    title: 'stat',
    dataIndex: 'stat',
  },
  {
    title: 'trade_no',
    dataIndex: 'trade_no',
  },
  {
    title: 'user_code',
    dataIndex: 'user_code',
  },
  {
    title: 'yi_cate_id',
    dataIndex: 'yi_cate_id',
  },
  {
    title: '操作',
    width: 120,
    dataIndex: 'ID',
    slots: { customRender: 'action' },
  },
];
