import { BasicColumn } from '/@/components/Table';

export const Columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '服务码',
    dataIndex: 'service_code',
  },
  {
    title: '拥有者',
    width: 150,
    dataIndex: 'owner_nick',
  },
  {
    title: '状态',
    children: [
      {
        title: '商城',
        width: 50,
        dataIndex: 'enable_mall',
        slots: { customRender: 'enabled' },
      },
      {
        title: '大师',
        width: 50,
        dataIndex: 'enable_master',
        slots: { customRender: 'enabled' },
      },
      {
        title: '悬赏',
        width: 50,
        dataIndex: 'enable_prize',
        slots: { customRender: 'enabled' },
      },
      {
        title: '闪断',
        width: 50,
        dataIndex: 'enable_vie',
        slots: { customRender: 'enabled' },
      },
      {
        title: '启用',
        width: 50,
        dataIndex: 'enabled',
        slots: { customRender: 'enabled' },
      },
    ],
  },
  {
    title: '操作',
    width: 140,
    dataIndex: 'action',
    slots: { customRender: 'action' },
  },
];
