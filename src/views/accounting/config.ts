import { BasicColumn } from '/@/components/Table';

export const ProductColumns: BasicColumn[] = [
  {
    title: 'ID',
    width: 50,
    dataIndex: 'id_of_es',
    slots: { customRender: 'id' },
  },
  {
    title: '名称',
    width: 120,
    dataIndex: 'name',
  },
  {
    title: '类型',
    width: 120,
    dataIndex: 'cate_name',
  },
  {
    title: '图片',
    // width: 200,
    dataIndex: 'images',
    slots: { customRender: 'images' },
  },
  {
    title: '规格',
    // width: 300,
    dataIndex: 'colors',
    slots: { customRender: 'colors' },
  },
  {
    title: '状态',
    width: 90,
    dataIndex: 'enabled',
    slots: { customRender: 'enabled' },
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
    title: 'broker_id',
    dataIndex: 'broker_id',
  },
  {
    title: '操作',
    width: 120,
    dataIndex: 'ID',
    slots: { customRender: 'action' },
  },
];
