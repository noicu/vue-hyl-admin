import { BasicColumn } from '/@/components/Table';

export const AdminColumns: BasicColumn[] = [
  {
    title: '业务单号',
    dataIndex: 'bill_no',
  },
  {
    title: '业务类型',
    dataIndex: 'b_type',
    slots: { customRender: 'type' },
  },
  {
    title: '发生额',
    dataIndex: 'amt',
    slots: { customRender: 'amt' },
  },
  {
    title: '期初',
    dataIndex: 'AmtStart',
  },
  {
    title: '期末',
    dataIndex: 'AmtStart',
    slots: { customRender: 'amtend' },
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '摘要',
    dataIndex: 'summary',
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
  },
];

export const BrokerColumns: BasicColumn[] = [
  {
    title: '业务单号',
    dataIndex: 'bill_no',
  },
  {
    title: '业务类型',
    dataIndex: 'b_type',
    slots: { customRender: 'type' },
  },
  {
    title: '发生额',
    dataIndex: 'amt',
    slots: { customRender: 'amt' },
  },
  {
    title: '期初',
    dataIndex: 'amt_start',
  },
  {
    title: '期末',
    dataIndex: 'amt_start',
    slots: { customRender: 'amtend' },
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '摘要',
    dataIndex: 'summary',
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
  },
];
