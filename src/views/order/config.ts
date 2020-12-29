import { BasicColumn } from '/@/components/Table';

export const ProductColumns: BasicColumn[] = [
  {
    title: '金额',
    dataIndex: 'amt',
    width: 120,
  },
  {
    title: '运营商名称',
    dataIndex: 'broker_name',
  },
  // {
  //   title: '联系人',
  //   dataIndex: 'contact',
  // },
  // {
  //   title: '发货处理人',
  //   dataIndex: 'deliver',
  // },
  {
    title: '发货时间',
    dataIndex: 'delivery_time',
  },
  {
    title: '用户昵称',
    dataIndex: 'nick',
  },
  {
    title: '商品',
    dataIndex: 'items',
    slots: { customRender: 'items' },
  },
  {
    title: '状态',
    dataIndex: 'stat',
    slots: { customRender: 'stat' },
  },
  {
    title: '操作',
    width: 160,
    dataIndex: 'ID',
    slots: { customRender: 'action' },
  },
];

export const ProductHisColumns: BasicColumn[] = [
  {
    title: '金额',
    dataIndex: 'amt',
    width: 120,
  },
  {
    title: '运营商名称',
    dataIndex: 'broker_name',
  },
  {
    title: '发货时间',
    dataIndex: 'delivery_time',
  },
  {
    title: '用户昵称',
    dataIndex: 'nick',
  },
  {
    title: '状态',
    dataIndex: 'stat',
    slots: { customRender: 'stat' },
  },
];

export const MasterColumns: BasicColumn[] = [
  {
    title: '金额',
    dataIndex: 'amt',
    width: 120,
  },
  {
    title: '运营商名称',
    dataIndex: 'broker_name',
  },
  {
    title: 'comment',
    dataIndex: 'comment',
  },
  {
    title: '诊断',
    dataIndex: 'diagnose',
  },
  {
    title: '大师昵称',
    dataIndex: 'master_nick_ref',
  },
  {
    title: '大师手机号',
    dataIndex: 'master_user_code_ref',
  },
  {
    title: '昵称',
    dataIndex: 'nick_ref',
  },
  {
    title: 'order_type',
    dataIndex: 'order_type',
  },
  {
    title: 'stat',
    dataIndex: 'stat',
    slots: { customRender: 'stat' },
  },
  {
    title: '用户手机号',
    dataIndex: 'user_code',
  },
];
