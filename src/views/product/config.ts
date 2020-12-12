import { BasicColumn, FormProps } from '/@/components/Table';

export const Columns: BasicColumn[] = [
  {
    title: 'ID',
    // width: 200,
    dataIndex: 'id_of_es',
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
    title: '颜色',
    // width: 300,
    dataIndex: 'colors',
    slots: { customRender: 'colors' },
  },
  {
    title: '状态',
    width: 120,
    dataIndex: 'enabled',
    slots: { customRender: 'enabled' },
  },
];

export const FormItem: Partial<FormProps> = {
  labelWidth: 100,
  schemas: [
    {
      field: `user_code`,
      label: `用户名`,
      component: 'Input',
      colProps: {
        xl: 12,
        xxl: 8,
      },
    },
    {
      field: `nick`,
      label: `昵称`,
      component: 'Input',
      colProps: {
        xl: 12,
        xxl: 8,
      },
    },
  ],
};
