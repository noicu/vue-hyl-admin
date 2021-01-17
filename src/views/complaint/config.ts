import { BasicColumn } from '/@/components/Table';

export const Columns: BasicColumn[] = [
  // {
  //   title: '订单ID',
  //   dataIndex: 'order_id',
  // },
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '投诉人',
    dataIndex: 'nick',
  },
  {
    title: '摘要',
    dataIndex: 'brief',
  },
  {
    title: '投诉时间',
    dataIndex: 'CreateDate',
  },
  // {
  //   title: '运营商处理时间',
  //   dataIndex: 'b_audit_date',
  // },
  // {
  //   title: '运营商处理人昵称',
  //   dataIndex: 'b_auditor_nick',
  // },
  {
    title: '状态',
    width: 100,
    dataIndex: 'stat',
    slots: { customRender: 'stat' },
  },
  {
    title: '退款',
    width: 80,
    dataIndex: 'draw_back',
    slots: { customRender: 'drawback' },
  },
  {
    title: '操作',
    width: 160,
    dataIndex: 'ID',
    slots: { customRender: 'action' },
  },
];

export const HisColumns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '摘要',
    dataIndex: 'brief',
  },
  {
    title: '状态',
    width: 600,
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
