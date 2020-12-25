import { BasicColumn } from '/@/components/Table';

export const BrokerColumns: BasicColumn[] = [
  {
    title: '昵称',
    dataIndex: 'nick',
    width: 120,
  },
  {
    title: '收款人帐号',
    dataIndex: 'card.card_code',
  },
  {
    title: '收款人帐户名称',
    dataIndex: 'card.full_name',
  },
  {
    title: '开户行',
    dataIndex: 'card.bank_name',
  },
  {
    title: '开户支行编号',
    dataIndex: 'card.branch_band_id',
  },
  {
    title: '开户行地址',
    dataIndex: 'card.branch_bank_addr',
  },
  {
    title: '提现金额',
    dataIndex: 'amt',
  },
  {
    title: '税金',
    dataIndex: 'tax',
  },
  {
    title: '操作',
    width: 150,
    dataIndex: 'ID',
    slots: { customRender: 'action' },
  },
];

export const ExBrokerColumns: BasicColumn[] = [
  {
    title: '收款人帐号',
    dataIndex: 'card.card_code',
  },
  {
    title: '收款人帐户名称',
    dataIndex: 'card.full_name',
  },
  {
    title: '开户行',
    dataIndex: 'card.bank_name',
  },
  {
    title: '开户支行编号',
    dataIndex: 'card.branch_band_id',
  },
  {
    title: '开户行地址',
    dataIndex: 'card.branch_bank_addr',
  },
  {
    title: '金额',
    dataIndex: 'amt',
  },
];

export const MasterColumns: BasicColumn[] = [
  {
    title: '昵称',
    dataIndex: 'master_nick',
    width: 120,
  },
  {
    title: '收款人帐号',
    dataIndex: 'card.card_code',
  },
  {
    title: '收款人帐户名称',
    dataIndex: 'card.full_name',
  },
  {
    title: '开户行',
    dataIndex: 'card.bank_name',
  },
  {
    title: '开户支行编号',
    dataIndex: 'card.branch_band_id',
  },
  {
    title: '开户行地址',
    dataIndex: 'card.branch_bank_addr',
  },
  {
    title: '提现金额',
    dataIndex: 'amt',
  },
  {
    title: '税金',
    dataIndex: 'tax',
  },
  {
    title: '操作',
    width: 150,
    dataIndex: 'ID',
    slots: { customRender: 'action' },
  },
];
