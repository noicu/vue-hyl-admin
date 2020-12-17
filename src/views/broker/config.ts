import { BasicColumn } from '/@/components/Table';

export const Columns: BasicColumn[] = [
  {
    title: 'ID',
    width: 150,
    dataIndex: 'id',
  },
  {
    title: '名称',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '摘要',
    dataIndex: 'brief',
  },
  {
    title: '服务码',
    dataIndex: 'service_code',
  },
  {
    title: '更新时间',
    dataIndex: 'update_at',
  },
  {
    title: '创建时间',
    sorter: true,
    dataIndex: 'created_at',
  },
  {
    title: 'account_code',
    dataIndex: 'account_code',
  },
  {
    title: 'account_type',
    dataIndex: 'account_type',
  },
  {
    title: 'enable_mall',
    dataIndex: 'enable_mall',
  },
  {
    title: 'enable_master',
    dataIndex: 'enable_master',
  },
  {
    title: 'enable_prize',
    dataIndex: 'enable_prize',
  },
  {
    title: 'enable_vie',
    dataIndex: 'enable_vie',
  },
  {
    title: 'enabled',
    dataIndex: 'enabled',
  },
  {
    title: 'icon',
    dataIndex: 'icon',
  },
  {
    title: 'owner_icon',
    dataIndex: 'owner_icon',
  },
  {
    title: 'owner_id',
    dataIndex: 'owner_id',
  },
  {
    title: 'owner_nick',
    dataIndex: 'owner_nick',
  },
  {
    title: 'owner_user_code',
    dataIndex: 'owner_user_code',
  },
  {
    title: 'ver',
    dataIndex: 'ver',
  },
];
