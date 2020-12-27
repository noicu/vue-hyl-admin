import { BasicColumn } from '/@/components/Table';

export const Columns: BasicColumn[] = [
  {
    title: 'nick',
    dataIndex: 'nick',
  },
  {
    title: 'user_code',
    dataIndex: 'user_code',
  },
  {
    title: 'user_name',
    dataIndex: 'user_name',
  },
  {
    title: 'sex',
    dataIndex: 'sex',
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
