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
    title: '变动金额',
    dataIndex: 'amt',
    slots: { customRender: 'amt' },
  },
  {
    title: '起始金额',
    dataIndex: 'AmtStart',
  },
  {
    title: '结束金额',
    dataIndex: 'AmtStart',
    slots: { customRender: 'amtend' },
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '业务摘要',
    dataIndex: 'summary',
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
  },
];

export const BrokerColumns: BasicColumn[] = [
  {
    title: 'bill_no',
    dataIndex: 'bill_no',
  },
  {
    title: 'b_type',
    dataIndex: 'b_type',
  },
  {
    title: 'broker_id',
    dataIndex: 'broker_id',
  },
  {
    title: 'broker_name',
    dataIndex: 'broker_name',
  },
  {
    title: 'amt',
    dataIndex: 'amt',
  },
  {
    title: 'amt_start',
    dataIndex: 'amt_start',
  },
  {
    title: 'remark',
    dataIndex: 'remark',
  },
  {
    title: 'summary',
    dataIndex: 'summary',
  },
  {
    title: 'created_at',
    dataIndex: 'created_at',
  },
];
