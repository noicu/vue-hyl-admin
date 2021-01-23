import { BasicColumn } from '/@/components/Table';

export const BrokerColumns: BasicColumn[] = [
  {
    title: '申请时间',
    dataIndex: 'created_at',
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '服务码',
    dataIndex: 'service_code',
  },
  {
    title: '昵称',
    dataIndex: 'owner_nick',
  },
  {
    title: '手机号',
    dataIndex: 'owner_user_code',
    width: 120,
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

export const MasterColumns: BasicColumn[] = [
  {
    title: '申请时间',
    dataIndex: 'create_date',
  },
  {
    title: '摘要',
    dataIndex: 'info.brief',
  },
  {
    title: '昵称',
    dataIndex: 'info.nick',
  },
  {
    title: '手机号',
    dataIndex: 'info.user_code',
    width: 120,
  },
  {
    title: '图片',
    dataIndex: 'images',
    slots: { customRender: 'images' },
    width: 120,
  },
  {
    title: '服务项',
    dataIndex: 'item',
    slots: { customRender: 'item' },
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'stat',
    slots: { customRender: 'stat' },
    width: 70,
  },
  {
    title: '操作',
    width: 160,
    dataIndex: 'ID',
    slots: { customRender: 'action' },
  },
];
