import { BasicColumn } from '/@/components/Table';

export const AdminColumns: BasicColumn[] = [
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
    title: '手机号',
    dataIndex: 'user_code',
  },
  {
    title: '状态',
    width: 120,
    dataIndex: 'enabled',
    slots: { customRender: 'enabled' },
  },
  {
    title: '操作',
    width: 120,
    dataIndex: 'ID',
    slots: { customRender: 'action' },
  },
];
