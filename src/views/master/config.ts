import { BasicColumn } from '/@/components/Table';

export const Columns: BasicColumn[] = [
  {
    title: 'UID',
    width: 150,
    dataIndex: 'uid',
  },
  {
    title: '昵称',
    dataIndex: 'nick',
    width: 120,
  },
  {
    title: '用户名',
    dataIndex: 'user_code',
  },
  {
    title: '状态',
    width: 120,
    dataIndex: 'enabled',
    slots: { customRender: 'enabled' },
  },
  {
    title: 'bad_rate',
    dataIndex: 'bad_rate',
  },
  {
    title: 'best_rate',
    dataIndex: 'best_rate',
  },
  {
    title: 'brief',
    dataIndex: 'brief',
  },
  {
    title: 'created_at',
    dataIndex: 'created_at',
  },
  {
    title: 'icon',
    dataIndex: 'icon',
  },
  {
    title: 'level',
    dataIndex: 'level',
  },
  {
    title: 'mid_rate',
    dataIndex: 'mid_rate',
  },
  {
    title: 'order_total',
    dataIndex: 'order_total',
  },
  {
    title: 'rate',
    dataIndex: 'rate',
  },
  {
    title: 'rebate',
    dataIndex: 'rebate',
  },
  {
    title: 'sign_date',
    dataIndex: 'sign_date',
  },
  {
    title: 'update_at',
    dataIndex: 'update_at',
  },
  {
    title: 'ver',
    dataIndex: 'ver',
  },
  {
    title: '操作',
    width: 120,
    dataIndex: 'ID',
    slots: { customRender: 'action' },
  },
];
