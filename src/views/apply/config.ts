import { BasicColumn } from '/@/components/Table';

export const BrokerColumns: BasicColumn[] = [
  {
    title: '申请时间',
    dataIndex: 'created_at',
  },
  {
    title: 'name',
    dataIndex: 'name',
  },
  {
    title: 'service_code',
    dataIndex: 'service_code',
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
    title: 'user_code',
    dataIndex: 'info.user_code',
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
