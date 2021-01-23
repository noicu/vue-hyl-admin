import { BasicColumn } from '/@/components/Table';

export const ProductColumns: BasicColumn[] = [
  // {
  //   title: 'ID',
  //   width: 50,
  //   dataIndex: 'id_of_es',
  //   slots: { customRender: 'id' },
  // },
  {
    title: '名称',
    width: 120,
    dataIndex: 'name',
  },
  {
    title: '类型',
    width: 120,
    dataIndex: 'cate_name',
  },
  // {
  //   title: '图片',
  //   // width: 200,
  //   dataIndex: 'images',
  //   slots: { customRender: 'images' },
  // },
  // {
  //   title: '规格',
  //   // width: 300,
  //   dataIndex: 'colors',
  //   slots: { customRender: 'colors' },
  // },
  {
    title: '加价',
    dataIndex: 'price_offset',
  },
  {
    title: '状态',
    width: 90,
    dataIndex: 'enabled',
    slots: { customRender: 'enabled' },
  },
  // {
  //   title: '操作',
  //   width: 160,
  //   dataIndex: 'ID',
  //   slots: { customRender: 'action' },
  // },
];

export const MasterColumns: BasicColumn[] = [
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
    title: '摘要',
    dataIndex: 'brief',
  },
  {
    title: '订单量',
    dataIndex: 'order_total',
  },

  {
    title: '退款',
    dataIndex: 'rebate',
  },
  {
    title: '状态',
    width: 70,
    dataIndex: 'enabled',
    slots: { customRender: 'enabled' },
  },
];
