import { BasicColumn } from '/@/components/Table';

export const Columns: BasicColumn[] = [
  {
    title: 'ID',
    width: 50,
    dataIndex: 'id_of_es',
    slots: { customRender: 'id' },
  },
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
  {
    title: '图片',
    // width: 200,
    dataIndex: 'images',
    slots: { customRender: 'images' },
  },
  {
    title: '规格',
    // width: 300,
    dataIndex: 'colors',
    slots: { customRender: 'colors' },
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
