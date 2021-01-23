import { BasicColumn } from '/@/components/Table';

export const Columns: BasicColumn[] = [
  // {
  //   title: 'ID',
  //   dataIndex: 'id',
  // },
  {
    title: '昵称',
    dataIndex: 'nick',
  },
  {
    title: '手机号',
    dataIndex: 'user_code',
  },
  {
    title: '用户名',
    dataIndex: 'user_name',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    slots: { customRender: 'sex' },
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
